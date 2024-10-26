import React, { useEffect, useState } from 'react';
import { ReceiveCard } from '../component/ReceiveCard'; // ReceiveCardコンポーネントをインポート
import { Notice } from '../component/Notice';

export const Receive = () => {
    const [messages, setMessages] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [noticeMsg, setNoticeMsg] = useState('');
    const [prepareFlags, setPrepareFlags] = useState({});

    useEffect(() => {
        // SSE接続を確立
        const eventSource = new EventSource('https://craft-oshi.chu.jp/php/sse.php');

        // メッセージを受信
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);

            // 新しいメッセージのIDを抽出
            const newMessageIds = new Set(data.map(message => message.id));

            // 既存のメッセージをフィルタリングして更新
            setMessages(prevMessages => {
                const existingIds = new Set(prevMessages.map(message => message.id));
                const updatedMessages = data.filter(message => !existingIds.has(message.id));

                // 新しいメッセージを追加し、既存のメッセージを保持
                const mergedMessages = [
                    ...prevMessages.filter(message => newMessageIds.has(message.id)), // DBにあるメッセージを保持
                    ...updatedMessages // 新しいメッセージを追加
                ];

                // 新しいメッセージがある場合のみアラートを表示
                if (updatedMessages.length > 0) {
                    setShowAlert(true);
                    setNoticeMsg('新しい注文が届きました！'); // アラートメッセージを設定
                }

                return mergedMessages;
            });
        };

        // エラーハンドリング
        eventSource.onerror = () => {
            console.error('SSE connection error');
            // エラーが発生した場合、再接続を試みる
            setTimeout(() => {
                eventSource.close();
                eventSource = new EventSource('https://craft-oshi.chu.jp/php/sse.php');
            }, 3000); // 3秒後に再接続
        };

        // コンポーネントがアンマウントされたときにイベントソースを閉じる
        return () => {
            eventSource.close();
        };
    }, []); // 空の依存配列で初回マウント時のみ実行

    // 受信したメッセージを処理する関数
    const handleReceived = async (id) => {
        // 受信処理の実装
        console.log(`Received: ${id}`);
        // 必要に応じてprepareFlagsを更新
        //  データの更新削除
        try {
            const response = await fetch(`${process.env.PUBLIC_URL}/php/process-done.php`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: id
            });
            if (!response.ok) {
                // レスポンスステータスコードが200台でない場合
                throw new Error(`HTTPエラー ${response.status}`);
            };

            const result = await response.json();

            console.log("サーバーからのレスポンス:", result);

            if (result['status'] === 'OK') {
                // メッセージを削除する
                setMessages(prevMessages =>
                    prevMessages.filter(message => message.id !== id) // IDが一致しないメッセージだけを残す
                );
                console.log("成功しました。");
            }
            else {
                console.log("失敗しました。");
            };

        } catch (error) {
            console.log("API通信エラー", error);
            return
        } finally {
            return
        }
    };

    const handlePrepare = async (id) => {
        setPrepareFlags((prevFlags) => ({
            ...prevFlags,
            [id]: true, // 準備フラグを更新
        }));
        // 受信処理の実装
        console.log(`Received: ${id}`);
        // 必要に応じてprepareFlagsを更新
        //  データの更新削除
        try {
            const response = await fetch(`${process.env.PUBLIC_URL}/php/process-prepare.php`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: id
            });
            if (!response.ok) {
                // レスポンスステータスコードが200台でない場合
                throw new Error(`HTTPエラー ${response.status}`);
            };

            const result = await response.json();

            console.log("サーバーからのレスポンス:", result);

            if (result['status'] === 'OK') {
                // メッセージを削除する
                setMessages(prevMessages =>
                    prevMessages.filter(message => message.id !== id) // IDが一致しないメッセージだけを残す
                );
                console.log("成功しました。");
            }
            else {
                console.log("失敗しました。");
            };

        } catch (error) {
            console.log("API通信エラー", error);
            return
        } finally {
            return
        }
    };

    // スタイルオブジェクト
    const styles = {
        container: {
            padding: '20px',
        },
        cardsContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
        },
    };

    return (
        <div style={styles.container}>
            <h1>注文一覧</h1>
            <div style={styles.cardsContainer}>
                {messages.map((message) => (
                    <ReceiveCard
                        key={message.id}
                        {...message}
                        onComplete={handleReceived}
                        onPrepare={handlePrepare}
                        prepare_flag={prepareFlags[message.id]}
                    />
                ))}
                {showAlert && (
                    <Notice message={noticeMsg} onClose={() => setShowAlert(false)} />
                )}
            </div>
        </div>
    );
};


