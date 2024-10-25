import React from 'react'

export const Catalogcard = (props) => {
    return (
        <>
            <li className="catalog_list-item">
                <img src={props.imageURL} alt="商品名" className='item-image' width={300} height={300} loading='lazy' />
                <h2 className={`${props.color} item-name `} >
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

