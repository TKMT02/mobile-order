import React from 'react'

export const Cart_item = (props) => {
    return (
        <li className='cart_content_list-item'>
            <img src={props.Image} alt="" className='cart_content-list-item-image' />
            <div className="cart_content-list-item_body">
                <h3 className="cart_content-title">
                    コーヒークラッシュ
                </h3>
                <ul className="cart_topping_list">
                    <li className="cart_topping_list-item">
                        トッピング名
                        {/* {props.topping_01} */}
                    </li>
                    <li className="cart_topping_list-item">
                        トッピング名
                        {/* {props.topping_02} */}
                    </li>
                </ul>
                <button
                    type="button"
                    className='deletebutton'>削除</button>
            </div>
        </li>
    )
}
