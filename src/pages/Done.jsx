import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Header } from '../component/Header';

export const Done = () => {
    const nav = useNavigate();
    const location = useLocation();
    const { OK } = location.state || {}; // デフォルト値を設定
    const [msg, setMsg] = useState('申し訳ありません。エラーによって注文が完了できませんでした。');

    // OKの値に基づいてメッセージを設定
    useEffect(() => {
        if (OK === 0) {
            setMsg("申し訳ありません。エラーによって注文が完了できませんでした。");
        } else if (OK === 1) {
            setMsg("注文を承りました。");
        }

        // 3秒後にメニュー画面に遷移
        const timer = setTimeout(() => {
            nav('/order');
        }, 3000);

        // クリーンアップ: タイマーを解除
        return () => clearTimeout(timer);
    }, [OK, nav]); // OKが変更された場合のみ実行 

    const handleReturn = () =>{
        nav('/order');
    }

    return (
        <>
            <Header />

            <div className="done_container">
                <h1>{msg}</h1>
                <p className="error">
                    ※3秒後にメニューページに戻ります。
                </p>
                <p>動作しない場合は<br /><a onClick={handleReturn}>こちら</a>をクリックしてください。</p>
            </div>

        </>
    );
};