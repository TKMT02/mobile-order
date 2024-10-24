import React from 'react'

export const History_card = (props) => {
    return (
        <li className='history_list-item'>
            <p>ジュース：{props.juice}</p>
            <p>トッピング：{props.topping_01}</p>
            <p>トッピング：{props.topping_02}</p>
            <p>注文時間：{props.timestamp}</p>
        </li>
    )
}
