import React, { useEffect, useState } from 'react';
import { MonitorCard } from '../component/MonitorCard';
import '../css/monitor.css';

export const Monitor = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const eventSource = new EventSource('https://craft-oshi.chu.jp/php/sse.php');

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);

            // 新しいメッセージのIDを抽出
            const newMessageIds = new Set(data.map(message => message.id));

            // 既存のメッセージをフィルタリングして更新
            setMessages(prevMessages => {
                const existingIds = new Set(prevMessages.map(message => message.id));
                const updatedMessages = data.filter(message => !existingIds.has(message.id));

                // 新しいメッセージを追加し、既存のメッセージを保持
                return [
                    ...prevMessages.filter(message => newMessageIds.has(message.id)), // DBにあるメッセージを保持
                    ...updatedMessages // 新しいメッセージを追加
                ];
            });
        };

        eventSource.onerror = () => {
            console.error('SSE connection error');
            // エラーが発生した場合、再接続を試みる
            setTimeout(() => {
                eventSource.close();
                eventSource = new EventSource('https://craft-oshi.chu.jp/php/sse.php');
            }, 3000); // 3秒後に再接続
        };

        return () => {
            eventSource.close();
        };
    }, []); // 空の依存配列で初回マウント時のみ実行

    return (
        <div>
            <h1 className='monitor-title'>お待ちのお客様 -注文モニター-</h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {messages.map((row) => (
                    <MonitorCard
                        key={row.id}
                        id={row.id}
                        userid={row.user_id}
                        username={row.user_name}
                        timestamp={row.timestamp}
                    />
                ))}
            </div>
        </div>
    );
};
