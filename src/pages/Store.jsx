import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { Header } from '../component/Header';
import { Footer } from '../component/Footer';
import { Catalog_card } from '../component/Catalog_card';
import { Topping_card } from '../component/Topping_card';
import { Notice } from '../component/Notice';

export const Store = () => {
    //  メニューデータ処理
    const [juiceData, setJuiceData] = useState([]);
    const [toppingData, setToppingData] = useState([]);
    const [nowStatus, setNowStatus] = useState('juice');
    const [toppingFlag, setToppingFlag] = useState([]);
    const [orderData, setOrderData] = useState({});

    //  注文データ処理
    const [preorderData, setPreorderData] = useState([]);
    const [cart_content, setCart_content] = useState([]);

    //  通知処理
    const [noticeMsg, setNoticeMsg] = useState('');
    const [showNotice, setShowNotice] = useState(false);

    //  一次選択ジュースと画像
    const [selectJuiceImage, setSelectJuiceImage] = useState("");
    const [selectJuiceName, setSelectJuiceName] = useState("");

    const nav = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('JSON/MenuData.json', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    throw new Error("ネットワークの応答エラーです。")
                }

                const data = await res.json();
                setJuiceData(data.juice);
                setToppingData(data.topping);
                //  idを取得
                const toppings = data.topping;
                const toppingStatus = toppings.reduce((acc, topping) => {
                    acc[topping.title] = false;
                    return acc;
                }, {});
                setToppingFlag(toppingStatus);
            } catch (error) {

            } finally {

            }
        }

        fetchData();
    }, [])

    //  注文キャンセル
    const handleCloseTopping = () => {
        setNowStatus("juice");
        const updatedToppingFlag = { ...toppingFlag };
        toppingData.forEach(e => {
            updatedToppingFlag[e.title] = false;
        });

        // toppingFlagを更新するためのセッターを使用
        setToppingFlag(updatedToppingFlag);
        setPreorderData([]);
        document.body.style.overflow = 'auto';
    }

    //  ジュースの追加
    const handleSelectJuice = (id, title, image) => {
        setOrderData({ 
                "id": id, 
                "juice": title,
                "topping01": "なし",
                "topping02": "なし",
            })
        setSelectJuiceName(title);
        setSelectJuiceImage(image);
        setNowStatus("topping");
        document.body.style.overflow = 'hidden';

        //  デバック
        console.log(JSON.parse(localStorage.getItem("temp_cart")));
    };

    // トッピングの追加
    const addTopping = (id, title) => {
        console.log(orderData);
        console.log(id);
        console.log(toppingFlag);
        const updatedToppingFlag = { ...toppingFlag };
        let temp_data = preorderData;   //  []空白の配列
        console.log(temp_data);
        if (!temp_data.includes(title)) {
            temp_data.push(title);  //  [トッピング1]
            temp_data.forEach(e => {    //  false == true
                console.log(e);
                updatedToppingFlag[e] = true;
            }); 
            if (temp_data.length == 3) {    //  [トッピング1,トッピング2, トッピング3]
                updatedToppingFlag[temp_data[0]] = false;
                temp_data.shift();  //  [トッピング2, トッピング3]
            }

            let temp_orderData = orderData;

            temp_orderData.topping01 = temp_data[0] || "なし";
            temp_orderData.topping02 = temp_data[1] || "なし";

            setOrderData(temp_orderData);
            setToppingFlag(updatedToppingFlag);
            setPreorderData(temp_data);

        } else {
            //  含む場合

            temp_data = temp_data.filter(e => e !== title);
            updatedToppingFlag[title] = false;
            setToppingFlag(updatedToppingFlag);

            let temp_orderData = orderData;

            temp_orderData.topping01 = temp_data[0] || "なし";
            temp_orderData.topping02 = temp_data[1] || "なし";

            setOrderData(temp_orderData);
            setPreorderData(temp_data);
        }
    };

    //  カートに追加
    const handleAddCart = () => {
        const temp_cartData = cart_content;
        temp_cartData.push(orderData);
        setCart_content(temp_cartData);
        //  ローカルストレージに追加
        localStorage.setItem("temp_cart", JSON.stringify(temp_cartData));
        //  オーダー強制
        handleOrder();
        //  リセットと通知
        handleCloseTopping();
        handleNotice("店頭注文しました。");
        console.log(cart_content);
    }



    //  通知処理
    const handleNotice = (e) => {
        setShowNotice(true);
        setNoticeMsg(e);
        setTimeout(() => {
            setShowNotice(false);
        }, 1500);
    };


    //  注文処理
    const handleOrder = async () => {

        const UserName = "店頭注文";
        const UserID = "HOME";
        const userData =
        {
            "userID": UserID,
            "userName": UserName,
            "location": "店頭販売"
        };

        //  sendOrderDataに追加
        const OrderData = JSON.parse(localStorage.getItem("temp_cart"));

        const sendOrderData = { ...userData, ...OrderData };
        console.log(sendOrderData);

        //  データ保存（ＤＢ）
        try {
            const response = await fetch(`${process.env.PUBLIC_URL}/php/process-save.php`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(sendOrderData)
            });
            if (!response.ok) {
                // レスポンスステータスコードが200台でない場合
                throw new Error(`HTTPエラー ${response.status}`);
            };

            const result = await response.json();

            console.log("サーバーからのレスポンス:", result);

            if (result['status'] == 'success') {
                console.log("成功しました。");
            }
            else {
                console.log("失敗しました。");
            };

        } catch (error) {
            console.log("API通信エラー", error);
            return
        } finally {
            //  カートの中をリセット
            localStorage.setItem("cart", JSON.stringify(new Array()));
            return
        }
    }

    return (
        <>
            <div className="container">
                {showNotice && (
                    <Notice
                        message={noticeMsg}
                        onClose={() => setShowNotice(false)}
                    />
                )}
                <div className="fixed_content">
                    <Header cartCount={0} />
                    <div className="sub-header">
                        <p className='product_list-text'>商品一覧</p>
                        <p>全品一律150円</p>
                    </div>
                </div>
                <div className="catalog_content">
                    <ul className="catalog_list">
                        {juiceData.map((item, index) => {
                            return (
                                <Catalog_card
                                    key={index}
                                    id={item.id}
                                    color={item.color}
                                    imageURL={item.imageURL}
                                    title={item.title}
                                    explain={item.explain}
                                    onAdd={() => handleSelectJuice(item.id, item.title, item.imageURL)}
                                />
                            );
                        })}
                    </ul>
                    <div className="topping_content">
                        <h3 className="topping_title">
                            トッピング一覧
                        </h3>
                        <ul className="topping_list">
                            <li className="topping_list-item">
                                <p>アイス</p>
                            </li>
                            <li className="topping_list-item">
                                <p>イチゴ</p>
                            </li>
                            <li className="topping_list-item">
                                <p>オレオ</p>
                            </li>
                            <li className="topping_list-item">
                                <p>マシュマロ</p>
                            </li>
                            <li className="topping_list-item">
                                <p>ホイップ</p>
                            </li>
                            <li className="topping_list-item">
                                <p>チョコスプレー</p>
                            </li>
                            <li className="topping_list-item">
                                <p>タピオカ</p>
                            </li>
                            <li className="topping_list-item">
                                <p>ナタデココ</p>
                            </li>
                            <li className="topping_list-item">
                                <p>チョコソース</p>
                            </li>
                            <li className="topping_list-item none">

                            </li>
                        </ul>
                        <p className="caption">
                            ※ドリンク1品につき、トッピングは2つまで選択可能です。
                        </p>
                    </div>
                </div>
                <p className="note">
                    当サイトは東京電子専門学校2024年度学園祭ウェブメディア科
                    「推しドリンクカフェ」のモバイルオーダー専用サイトになりま
                    す。学園祭終了時点で当URLをご利用不可になります。
                    学園祭をお楽しみください!
                </p>
            </div>
            {/* トッピングモーダル */}

            {nowStatus === "topping" && (
                <div className='topping_content_modal'>
                    <div className="topping_content">
                        <div className="topping_content-head">
                            <p className="icon" onClick={handleCloseTopping}>
                                <FontAwesomeIcon
                                    icon={faCircleXmark} className='icon'
                                />
                            </p>
                            <p className="topping_content-title">
                                トッピング選択
                            </p>
                            <div className="topping_contents">
                                <img src={selectJuiceImage} alt="" className='selectJuiceImage' />

                                <p className="title">
                                    {selectJuiceName}
                                </p>

                            </div>
                        </div>
                        <div className="topping_content-body">
                            <div className="topping_content-body-head">
                                <p className='title'>トッピングを選択</p>
                                <p className="note">
                                    ※ドリンク1品につき、トッピングは2つまで選択可能です。
                                </p>
                            </div>
                            <ul className="topping_list">
                                {toppingData.map((item, index) => {
                                    return (
                                        <Topping_card
                                            key={index}
                                            id={item.id}
                                            imageURL={item.imageURL}
                                            title={item.title}
                                            onAdd={() => addTopping(item.id, item.title)}
                                            flag={toppingFlag[item.title]}
                                        />
                                    );
                                })}
                            </ul>
                            <button
                                type="button"
                                className='addCart'
                                onClick={() => handleAddCart()}
                            >
                                店頭注文する
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    )
}
