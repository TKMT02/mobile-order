import React from 'react'

export const Catalog_card = (props) => {
    return (
        <>
            <li className="catalog_list-item">
                <img src="https://placehold.jp/360x440.png?test" alt="商品名" className='item-image'/>
                <h2 className="item-name">
                    {props.title}
                </h2>
                <p className="item-explain">
                    {props.explain}
                </p>
                <button className='item-button' onClick={props.onAdd}>
                    これにする
                </button>
            </li>
        </>
    )
};

