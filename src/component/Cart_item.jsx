import React from 'react'

export const Cart_item = (props) => {
    return (
        <li className='cart_content_list-item'>
            <img src={props.Image} alt="" className='cart_content-list-item-image' />
            <div className="cart_content-list-item_body">
                <h3 className={`cart_content-title ${props.color}`}>
                    {props.title}
                </h3>
                <ul className="cart_topping_list">
                    <li className="cart_topping_list-item">
                        <p>{props.topping_01}</p>
                    </li>
                    <li className="cart_topping_list-item">
                        <p>{props.topping_02}</p>
                    </li>
                </ul>
                <button
                    type="button"
                    className='deletebutton'
                    onClick={props.deleteButton}
                >削除</button>
            </div>
        </li>
    )
}
