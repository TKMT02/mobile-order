import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../component/Header';
import { Cart_item } from '../component/Cart_item';


export const Cart = () => {

    const [sum_price, setSum_price] = useState(0);
    const [juiceData, setJuiceData] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [orderOK, setOrderOK] = useState(true);

    const [cart, setCart] = useState([]);
    const nav = useNavigate();

    useEffect(() => {

        // ジュースデータ
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
            } catch (error) {

            }
        }

        fetchData();

        // 一度だけ localStorage からデータを取得し、必要に応じて処理を行う
        const tempCartData = localStorage.getItem("temp_cart") ? JSON.parse(localStorage.getItem("temp_cart")) : [];
        const nowCartData = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

        // temp_cart が存在する場合、cart に追加
        if (tempCartData.length) {
            const CartData = [...nowCartData, ...tempCartData];
            localStorage.setItem("cart", JSON.stringify(CartData));
            localStorage.removeItem("temp_cart");
            setOrderOK(false);
        }

        // cart が存在する場合、データをセット
        if (JSON.parse(localStorage.getItem("cart")).length) {
            // cartID を追加
            const nowCartData = JSON.parse(localStorage.getItem("cart"));
            const updatedCartData = nowCartData.map((item, index) => ({
                ...item,
                cartID: index + 1,
            }));

            setCart(updatedCartData);

            // 合計金額の計算
            const SumPrice = updatedCartData.length * 150;
            const formattedSumPrice = SumPrice.toLocaleString();

            setSum_price(formattedSumPrice); // フォーマットした価格を設定
            setOrderOK(false);
        };

        handleUpdateCount();

    }, [])

    //  カウント処理
    const handleUpdateCount = () => {
        const Count_n = JSON.parse(localStorage.getItem("cart")) || [];
        const Count_t = JSON.parse(localStorage.getItem("temp_cart")) || [];
        const SumCartCount = Count_n.length + Count_t.length;
        setCartCount(SumCartCount);
    }

    //  注文削除
    const handleDeleteButton = (e) => {
        let delete_temp_cart = cart;
        console.log(e);
        delete_temp_cart = delete_temp_cart.filter(x => x.cartID !== e);
        setCart(delete_temp_cart);
        localStorage.setItem("cart", JSON.stringify(delete_temp_cart));
        console.log(delete_temp_cart);
        const SumPrice = delete_temp_cart.length * 150;
        // カンマ区切りでフォーマット
        const formattedSumPrice = SumPrice.toLocaleString();
        handleUpdateCount();
        if (SumPrice === 0) {
            setOrderOK(true);
        }

        setSum_price(formattedSumPrice); // フォーマットした価格を設定
    }

    const handleOrder = async () => {

        const UserName = localStorage.getItem("userName") || "匿名";
        const UserID = localStorage.getItem("userID") || "";
        const userData =
        {
            "userID": UserID,
            "userName": UserName,
            "location": "教務室"
        };

        //  sendOrderDataに追加
        const OrderData = JSON.parse(localStorage.getItem("cart"));
        const OrderData_X = JSON.parse(localStorage.getItem("cart"));

        console.log(OrderData);
        if (OrderData.length === 0) {
            return
        }
        //  カートの中身をHistoryに入れる
        const now = new Date();
        const nowTime = `${now.getMonth() + 1}月${now.getDate()}日 ${now.getHours()}時${now.getMinutes()}分`;
        for (let i = 0; i < OrderData_X.length; i++) {
            OrderData_X[i].timestamp = nowTime;
        }
        console.log(OrderData_X);
        //  カートの中身をHistoryに入れる
        localStorage.setItem("history_cart", JSON.stringify(OrderData_X));
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

            if (result['status'] === 'success') {
                nav("/done", { state: { OK: 1 } });
            }
            else {
                nav("/done", { state: { OK: 0 } });
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
            <Header cartCount={cartCount} />
            <div className="cart_container">
                <div className="cart_content">
                    <h3 className="cart_title">
                        ご注文の確認
                    </h3>
                    <div className="cart_content-head">
                        <p className="cart_content_title">
                            受け取り場所
                        </p>
                        <p className="cart_content_explain">
                            東京電子専門学校1・2号館7階
                        </p>
                    </div>
                    <div className="cart_content-head">
                        <p className="cart_content_title">
                            お支払方法（代引き）
                        </p>
                        <ul>
                            <li>
                                <p>・PayPay</p>
                            </li>
                            <li>
                                <p>・現金</p>
                            </li>
                        </ul>
                    </div>
                    <div className="cart_content-body">
                        <p className="cart_content_title">
                            商品確認
                        </p>
                        <ul className="cart_content_list">
                            {cart.length > 0 ? (
                                cart.map((cartItem, index) => {
                                    const matchingJuice = juiceData.find((juice) => juice.id === cartItem.id);

                                    // 一致するジュースがある場合のみCart_itemを表示
                                    if (matchingJuice) {
                                        return (
                                            <Cart_item
                                                key={`${cartItem.id}-${index}`}
                                                Image={matchingJuice.imageURL}
                                                color={matchingJuice.color}
                                                title={cartItem.juice}
                                                topping_01={cartItem.topping01}
                                                topping_02={cartItem.topping02}
                                                deleteButton={() => handleDeleteButton(cartItem.cartID)}
                                            />
                                        );
                                    }

                                    return null; // 一致するものがない場合はnullを返す
                                })
                            ) : (
                                <li className='cart_content_list-item-no'>
                                    <p>商品が追加されていません。</p>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="cart_content-footer">
                        <p className='sum_title'>
                            合計
                        </p>
                        <p className="sum_price">
                            {sum_price} 円
                        </p>
                    </div>
                    <p className="note">
                        注文後の内容の変更は致しかねます。
                        お支払いは注文後引き換えコードとともにお願いいたします。
                    </p>
                    <button
                        type='button'
                        className='orderbutton'
                        onClick={handleOrder}
                        disabled={orderOK}
                    >{orderOK ? "商品がありません" : "注文する"}
                    </button>
                </div>
            </div >
        </>
    )
}
