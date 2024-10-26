import React, { useEffect, useState } from 'react';
import { MonitorCard } from '../component/MonitorCard';
import '../css/monitor.css';

export const Monitor = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        let eventSource = new EventSource('https://craft-oshi.chu.jp/php/sse_monitor.php');

        const connect = () => {
            eventSource = new EventSource('https://craft-oshi.chu.jp/php/sse_monitor.php');

            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);

                const newMessageIds = new Set(data.map(message => message.id));

                setMessages(prevMessages => {
                    const existingIds = new Set(prevMessages.map(message => message.id));
                    const updatedMessages = data.filter(message => !existingIds.has(message.id));

                    return [
                        ...prevMessages.filter(message => newMessageIds.has(message.id)),
                        ...updatedMessages,
                    ];
                });
            };

            eventSource.onerror = () => {
                console.error('SSE connection error');
                eventSource.close();
                setTimeout(connect, 3000); // 3秒後に再接続
            };
        };

        connect();

        return () => {
            if (eventSource) eventSource.close(); // クリーンアップで接続を終了
        };
    }, []);

    return (
        <div>
            <h1 className='monitor-title'>お呼び出し番号 -注文モニター-</h1>

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
