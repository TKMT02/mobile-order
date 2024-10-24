import React, { useState, useEffect } from 'react';
import { Header } from '../component/Header';
import { Cart_item } from '../component/Cart_item';

export const Cart = () => {

    const [sum_price, setSum_price] = useState(0);
    const [juiceData, setJuiceData] = useState([]);


    const [cart, setCart] = useState([]);

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

            } finally {

            }
        }

        fetchData();

        if (localStorage.getItem("temp_cart")) {

            if (localStorage.getItem("cart")) {
                const nowCartData = JSON.parse(localStorage.getItem("cart"));
                const tempCartData = JSON.parse(localStorage.getItem("temp_cart"));
                const CartData = [...nowCartData, ...tempCartData];
                localStorage.setItem("cart", JSON.stringify(CartData));
                localStorage.removeItem("temp_cart");
            } else {
                const tempCartData = JSON.parse(localStorage.getItem("temp_cart"));
                localStorage.setItem("cart", JSON.stringify(tempCartData));
                console.log(tempCartData);
                localStorage.removeItem("temp_cart");
            }
        }

        if (localStorage.getItem("cart")) {

            const temp_cart = JSON.parse(localStorage.getItem("cart"));
            for (let i = 1; i < temp_cart.length; i++) {
                temp_cart[i - 1].cartID = i;
            }
            setCart(temp_cart);
            //  合計金額
            const CartData = JSON.parse(localStorage.getItem("cart"))
            const SumPrice = CartData.length * 150;
            // カンマ区切りでフォーマット
            const formattedSumPrice = SumPrice.toLocaleString();

            setSum_price(formattedSumPrice); // フォーマットした価格を設定
        }


        //  現在のカート状態を保存


    }, [])


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

        setSum_price(formattedSumPrice); // フォーマットした価格を設定
    }


    return (
        <>
            <Header />
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
                            東京電子専門学校4号館7階
                        </p>
                    </div>
                    <div className="cart_content-head">
                        <p className="cart_content_title">
                            お支払方法
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
                                                key={`${cartItem.id}-${index}`} // ユニークなkey
                                                Image={matchingJuice.imageURL} // juiceDataから取得
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
                                <li>商品が追加されていません。</li>
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
                    >注文する</button>
                </div>
            </div >
        </>
    )
}
