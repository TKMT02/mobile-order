import React, { useEffect, useState } from 'react';
import { MonitorCard } from '../component/MonitorCard';
import '../css/monitor.css';

export const Monitor = () => {
    const [data, setData] = useState([]); // 受信したデータを保存
    const [error, setError] = useState(null); // エラーメッセージを保存

    useEffect(() => {
        const eventSource = new EventSource('https://craft-oshi.chu.jp/php/sse.php');

        eventSource.addEventListener('message', (event) => {
            const parsedData = JSON.parse(event.data);

            if (parsedData.new || parsedData.updated) {
                const relevantData = parsedData.new || parsedData.updated;
                const { id, user_id, user_name, timestamp, status } = relevantData;

                // 重複するuser_idのデータがない場合のみ追加
                setData((prev) => {
                    const exists = prev.some((item) => item.user_id === user_id);
                    if (!exists) {
                        return [...prev, { id, user_id, user_name, timestamp, status }];
                    } else {
                        // statusが更新された場合、該当するデータを更新
                        return prev.map((item) =>
                            item.user_id === user_id ? { ...item, status } : item
                        );
                    }
                });
            }
        });

        eventSource.onerror = (error) => {
            console.error('SSE connection error:', error);
            setError('サーバーとの接続に問題があります。');
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div>
            <h1 className='monitor-title'>リアルタイム注文モニター</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {data.map((row) => (
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
