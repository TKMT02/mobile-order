import React, { useState } from 'react';
import { Header } from '../component/Header';
import { Cart_item } from '../component/Cart_item';

export const Cart = () => {

    const [sum_price, setSum_price] = useState("");

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
                        <p className="cart_content_explain">
                            <ul>
                                <li>・PayPay</li>
                                <li>・現金</li>
                            </ul>
                        </p>
                    </div>
                    <div className="cart_content-body">
                        <p className="cart_content_title">
                            商品確認
                        </p>
                        <ul className="cart_content_list">
                            <Cart_item 
                                Image={"https://placehold.jp/250x350.png"}
                            />
                            <Cart_item 
                                Image={"https://placehold.jp/250x350.png"}
                            />
                        </ul>
                    </div>
                    <div className="cart_content-footer">
                        <p className='sum_title'>
                            合計
                        </p>
                        <p className="sum_price">
                            - {sum_price}円
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
            </div>
        </>
    )
}
