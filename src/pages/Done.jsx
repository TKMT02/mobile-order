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
        return
    }, [OK, nav]); // OKが変更された場合のみ実行 

    const handleReturn = () =>{
        nav('/option');
    }

    return (
        <>
            <Header />

            <div className="done_container">
                <h1>{msg}</h1>
                <p><span className="red">注文から5分以内</span>に受付にお越しください。</p>
                <p>受け取りの際は左上のメニューからオプション画面を開き、受け取りカードを表示できるようにしてください。</p>
                <p className="error">
                    ※受け取り後の注文内容が確認できないことがございます。
                </p>
                <p>メニューページに戻るには<br /><a onClick={handleReturn}>こちら</a>をクリックしてください。</p>
            </div>

        </>
    );
};