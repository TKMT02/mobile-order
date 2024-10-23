import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../img/logo.png';
import { Notice } from '../component/Notice';

export const Start = () => {

    //  ナビゲーションシステム
    const navigate = useNavigate();
    const [firstLogin, setFirstLogin] = useState(false);
    const [PassInput, setPassInput] = useState("");
    const [NameInput, setNameInput] = useState("");
    const [NoticeMsg, setNoticeMsg] = useState('');
    const [showNotice, setShowNotice] = useState(false);

    //  useeffectで自動IDを取得
    useEffect(() => {

        const fetchData = async () => {
            const userData = localStorage.getItem("userID");
            if (!userData) {
                const id = await generateID();
                localStorage.setItem("userID", id);
                console.log('UserIDを生成しました。'); // デバック
                return
            }
            else {
                console.log("UserIDをすでに持っています。"); // デバック
                return
            }

            async function generateID() {
                try {
                    const res = await fetch(`${process.env.PUBLIC_URL}/api/generateUniqueID.php`, {
                        'method': 'GET',
                        'headers': {
                            'Content-Type': 'application/json',
                        },
                    });
                    const result = await res.json();
                    console.log(result);
                    if (result.status === "success") {
                        const id = result.id;
                        return id;
                    }
                } catch (error) {
                    console.log("API通信エラー:", error);
                    //  デバック用（ZZ00)
                    return 'ZZ00';
                }
            }
        }

        fetchData();

    }, []);

    const handleStart = () => {
        //  もしも初ログイン（ローカルストレージで管理）の場合、モーダルウィンドウを表示。
        //  それ以外の場合はメインの部分に転送
        const loginCheck = localStorage.getItem("login_ok");
        console.log(loginCheck);
        if (loginCheck) {
            navigate('/order');
        } else {
            //  モーダルを表示
            setFirstLogin(true); // このタイミングで自動IDあるなし検知
            const ID = localStorage.getItem("userID");
            if(ID){
                console.log("IDを所持しています。")
            } else {
                console.log("IDを持っていません。")
            }
        }
    }

    //  インプット
    const password = "denpasai";

    const handlePassInput = (e) => {
        e.preventDefault();
        setPassInput(e.target.value);
    }

    const handleNameInput = (e) => {
        e.preventDefault();
        setNameInput(e.target.value);
    }

    const handleLogin = (e) => {
        e.preventDefault(); // フォームのデフォルト動作を防止
        if(NameInput){
            localStorage.setItem("userName", NameInput);
        } else {
            localStorage.setItem("userName", "匿名");
        }
        if (PassInput === password) {
            localStorage.setItem("login_ok", true);
            navigate('./order');
        } else if (PassInput === "admin") {
            navigate('./res');
        } else if (PassInput === "reset00") {
            localStorage.clear("userName");
            localStorage.clear("userID");
            setNoticeMsg("管理者実行：リセット");
            // handleIDgenerate();
            handleNotice();
        } else if (PassInput === "monitor-00") {
            navigate("./monitor");
        } else {
            setPassInput("");
            setNoticeMsg("合言葉が間違っています！！");
            handleNotice();
        }
    };

    //  通知処理
    const handleNotice = () => {
        setShowNotice(true);
        // 1.5秒後にアラートを自動的に閉じる
        setTimeout(() => {
            setShowNotice(false);
        }, 1500);
    };

    return (
        <>
            <div className="start_container">
                {showNotice && (
                    <Notice
                        message={NoticeMsg}
                        onClose={() => setShowNotice(false)}
                    />
                )}
                {/* モーダルウィンド */}
                {firstLogin ? (
                    <div className="start_modal">
                        <h1>
                            <img src={Logo} alt="カスタム推しドリンク" className='logo-image' />
                        </h1>
                        <div className="modal_content">
                            <p className="modal-text">
                                合言葉を入力してね！
                            </p>
                            <input
                                type="text"
                                name="password"
                                id="password"
                                className='start_input'
                                autoComplete='off'
                                placeholder='QRコードの下にあるよ！'
                                onChange={handlePassInput}
                                value={PassInput}
                            />
                        </div>
                        <div className="modal_content">
                            <p className="modal-text">
                                ユーザー名を入力！
                            </p>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className='start_input'
                                autoComplete='off'
                                placeholder='お名前を入力'
                                onChange={handleNameInput}
                                value={NameInput}
                            />
                            <p className="modal-text-s">
                                未入力の場合は「匿名」になります。
                            </p>
                        </div>

                        <button
                            type='button'
                            className='start_modal_btn'
                            onClick={handleLogin}
                        >注文を始める</button>

                    </div>
                ) :
                    <div className="click_content" onClick={handleStart}>
                        <h1>
                            <img src={Logo} alt="カスタム推しドリンク" className='logo-image' />
                        </h1>
                        <p className="start_message">
                            ～タッチしてスタート～
                        </p>
                        <p className="footer-text">
                            ウェブ・メディア科
                        </p>
                    </div>}
            </div>
        </>
    )
}
