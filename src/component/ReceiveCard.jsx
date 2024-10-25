// Card.js
import React from 'react';

// Cardコンポーネントの定義
export const ReceiveCard = ({
    id,
    user_id,
    user_name,
    juice_name,
    topping_01,
    topping_02,
    timestamp,
    onComplete, 
    onPrepare,
    prepare_flag,
}) => {
    return (
        <div className="card" style={prepare_flag ? styles.P_card : styles.card} id={id}>
            <h2>注文ID: {user_id}</h2>
            <p>ユーザー名: {user_name}</p>
            <p>商品名: <span style={styles.bigFont}>{juice_name}</span></p>
            <p>トッピング1: <span style={styles.bigFont}>{topping_01}</span></p>
            <p>トッピング2: <span style={styles.bigFont}>{topping_02}</span></p>
            <p>注文時間: {timestamp}</p>
            <button onClick={() => onComplete(id)} style={styles.completeBtn}>
                受取完了
            </button>
            <button onClick={() => onPrepare(id)} style={styles.prepareBtn}>
                準備完了
            </button>
        </div>
    );
}

// スタイル定義
const styles = {
    card: {
        display: 'inline-block',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '15px',
        width: '350px',
        boxShadow: '2px 2px 12px rgba(0,0,0,0.1)',
    },
    P_card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        fontSize: '24px',
        padding: '15px',
        width: '380px',
        boxShadow: '2px 2px 12px rgba(0,0,0,0.1)',
        backgroundColor: '#bce2e8',
    },
    bigFont: {
        fontSize: '24px'
    },
    completeBtn: {
        marginTop: '10px',
        marginRight: '20px',
        padding: '8px 12px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#4CAF50',
        color: 'white',
        cursor: 'pointer',
    },
    prepareBtn: {
        marginTop: '10px',
        marginRight: '20px',
        padding: '8px 12px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#ee7800',
        color: 'white',
        cursor: 'pointer',
    },
};
