import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Header } from '../component/Header';
import { MyCard } from '../component/MyCard';


export const Done = () => {
    const nav = useNavigate();
    const location = useLocation();
    const { OK } = location.state || {}; // デフォルト値を設定
    const [msg, setMsg] = useState('申し訳ありません。エラーによって注文が完了できませんでした。');
    const [isModalShow_Card, setIsModalShow_Card] = useState(false);
    const [isTwoFingerTap, setIsTwoFingerTap] = useState(false);
    const [UserID, setUserID] = useState('');
    const [UserName, setUserName] = useState("");


    // OKの値に基づいてメッセージを設定
    useEffect(() => {

        setUserID(localStorage.getItem("userID"));
        setUserName(localStorage.getItem("userName"));

        if (OK === 0) {
            setMsg("申し訳ありません。エラーによって注文が完了できませんでした。");
        } else if (OK === 1) {
            setMsg("注文を承りました。");
        }
        return
    }, [OK, nav]); // OKが変更された場合のみ実行 

    const handleReturn = () =>{
        nav('/order');
    }

    const handleModalMyCard = (e) => {
        setIsModalShow_Card(e);
        return
    }

    const handleTouchStart = (e) => {
        if (e.touches.length === 2) {
            setIsTwoFingerTap(true);
        } else {
            setIsTwoFingerTap(false);
        }
    };

    const handleTouchEnd = () => {
        if (isTwoFingerTap) {
            setIsModalShow_Card(false);
        }
    };

    return (
        <>
            <Header />

            <div className="done_container">
                <h1>{msg}</h1>
                <p className='done_id'>受け取りID: <span className="id">{UserID}</span></p>
                <button type="button" className="showMyCard" onClick={() => handleModalMyCard(true)}>
                    受取カードを表示
                </button>
                <p className='done_text'>
                    画面は閉じずにお待ちください。<br />
                    <span className="red">注文から5分以内</span>に受付にお越しください。</p>
                <p className="error">
                    ※受け取り後の注文内容が確認できないことがございます。
                </p>
                <button onClick={handleReturn} className='return'>
                    <p>商品を受け取りました</p>
                </button>
                {isModalShow_Card && (
                    <MyCard
                        Name={UserName}
                        ID={UserID}
                        onCloseMyCard={() => handleModalMyCard(false)}
                        eventTouchStart={handleTouchStart}
                        eventTouchEnd={handleTouchEnd}
                    />
                )}
            </div>

        </>
    );
};