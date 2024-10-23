import React, { useEffect, useState, forwardRef } from 'react';
import { Header } from '../component/Header';
import { MyCard } from '../component/MyCard';
import { NameChange } from '../component/NameChange';

export const Option = () => {

    const [UserID, setUserID] = useState("");
    const [UserName, setUserName] = useState("");
    const [isModalShow_Card, setIsModalShow_Card] = useState(false);
    const [isModalShow_NameChange, setIsModalShow_NameChange] = useState(false);
    const [isTwoFingerTap, setIsTwoFingerTap] = useState(false);

    useEffect(() => {

        setUserID(localStorage.getItem("userID"));
        setUserName(localStorage.getItem("userName"));

        return
    }, [])

    const handleModalChangeName = (e) => {
        setIsModalShow_NameChange(e);
        setUserName(localStorage.getItem("userName"));
        return
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
            <div className="options_container">
                <p className="userid">
                    商品引き換え番号: <strong>{UserID}</strong>
                </p>
                <p className="username">
                    ニックネーム : <strong>{UserName}</strong>
                </p>
                <button type="button" className="nameChangeBtn" onClick={() => handleModalChangeName(true)}>
                    ニックネームを変更する
                </button>

                <h2 className="title">
                    商品受け取り方法
                </h2>
                <p className='note'>
                    商品を受け取る際には下記のボタンをタップして受け取りカードを表示させ、店員にご提示をお願いします。<br />
                    お客様の商品違いを防ぐためご協力をお願いいたします。
                </p>

                <h2 className="title">
                    お支払方法
                </h2>
                <ul className="paylist">
                    <li className="paylist-item">
                        <p className='text'>PayPay</p>
                    </li>
                    <li className="paylist-item">
                        <p className='text'>現金</p>
                    </li>
                </ul>

                <button type="button" className="showMyCard" onClick={() => handleModalMyCard(true)}>
                    受取カードを表示
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

                {isModalShow_NameChange && (
                    <NameChange
                        Name={UserName}
                        onCloseNC={() => handleModalChangeName(false)} />
                )}
            </div>
        </>
    );
};
