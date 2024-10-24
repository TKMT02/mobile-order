import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notice } from '../component/Notice';
import { ReceiveCard } from '../component/ReceiveCard';

export const Receive = () => {
    const nav = useNavigate();
    const [messages, setMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState(new Set());
    const [showAlert, setShowAlert] = useState(false);
    const [prepareFlags, setPrepareFlags] = useState({});
    const [noticeMsg, setNoticeMsg] = useState("");

    useEffect(() => {
        const eventSource = new EventSource('https://craft-oshi.chu.jp/php/sse.php');

        const handleMessage = (e) => {
            try {
                const data = JSON.parse(e.data);
                processReceivedData(data);
            } catch (error) {
                console.error('受信したデータのパースに失敗しました:', error);
            }
        };

        eventSource.addEventListener('message', handleMessage);

        return () => {
            eventSource.removeEventListener('message', handleMessage);
            eventSource.close();
        };
    }, []); // 依存配列を空にして初回マウント時のみ実行

    const processReceivedData = (data) => {
        // 新しいメッセージが追加された場合
        if (data.new) {
            setMessages((prevMessages) => [...prevMessages, data.new]);
            setReceivedMessages((prevSet) => new Set(prevSet).add(data.new.id));
        }

        // 既存のメッセージのステータスが更新された場合
        if (data.updated) {
            setMessages((prevMessages) =>
                prevMessages.map(msg =>
                    msg.id === data.updated.id ? { ...msg, status: data.updated.status } : msg
                )
            );
        }

        // メッセージが完了の場合
        if (data.status === '完了') {
            handleCompletedMessage(data.id);
        }
    };

    const handleCompletedMessage = (id) => {
        setMessages((prevMessages) => prevMessages.filter(msg => msg.id !== id));
        setReceivedMessages((prevSet) => {
            const newSet = new Set(prevSet);
            newSet.delete(id); // 完了したメッセージを削除
            return newSet;
        });
    };

    const handleReceived = async (id) => {
        console.log(id);
        const res = await fetch('https://craft-oshi.chu.jp/php/process-done.php', {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({ id }) // IDをオブジェクトにラップ
        });

        const result = await res.json();
        handleCompletedMessage(id);
        setNoticeMsg(result['status'] === 'OK' ? "完了しました。" : "失敗しました...");
        handleAlert();
    }

    const handlePrepare = (id) => {
        setPrepareFlags((prevFlags) => ({
            ...prevFlags,
            [id]: !prevFlags[id],
        }));
        console.log(id);
        console.log(prepareFlags);
    };

    const handleAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 1500);
    };

    return (
        <div style={styles.container}>
            <h1>注文一覧</h1>
            <div style={styles.cardsContainer}>
                {messages.map((message) => (
                    <ReceiveCard key={message.id}
                        {...message}
                        onComplete={handleReceived}
                        onPrepare={handlePrepare}
                        prepare_flag={prepareFlags[message.id]} />
                ))}
                {showAlert && (
                    <Notice
                        message={noticeMsg}
                        onClose={() => setShowAlert(false)}
                    />
                )}
            </div>
        </div>
    );
}

// スタイル定義
const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    cardsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
    },
};
