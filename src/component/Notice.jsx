import React, { useEffect } from 'react';
import '../css/animation.css';

export const Notice = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 1200); // 1.2秒後に閉じる

        return () => clearTimeout(timer); // コンポーネントがアンマウントされたときにタイマーをクリア
    }, [onClose]);
    if(message.includes("|")){
        const front_text = message.substr(0, message.indexOf('|'));
        const back_text =  message.substr(message.indexOf('|') + 1);
        return (
            <div style={styles.overlay}>
                <div style={styles.modal}>
                    <p style={styles.text}>{front_text}</p>
                    <p style={styles.text}>{back_text}</p>
                </div>
            </div>
        )
    } else{
        return (
            <div style={styles.overlay}>
                <div style={styles.modal}>
                    <p>{message}</p>
                </div>
            </div>
        );
    }
};

// スタイル定義
const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'center',
        zIndex: '90',
    },
    modal: {
        margin: '50px',
        padding: '20px',
        fontSize : '1.4rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        animation: 'slideDown 0.5s ease', // アニメーションの追加
        zIndex: '99',
    },
    text: {
        textAlign: 'center',
    }
};

