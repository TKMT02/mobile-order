import React, { useState, useEffect } from 'react';
import Logo from '../img/logo-row.png';

export const Header = (props) => {

    // // props.headerTitleが変更されたときだけsetTitleを実行
    // useEffect(() => {
    //     if (props.headerTitle) {
    //         setTitle(props.headerTitle);
    //     }
    // }, [props.headerTitle]); // props.headerTitleが変わったときのみ実行

    return (
        <header className="header">
            <h1>
                <img src={Logo} alt="クラフト推しドリンク" className='header_image'/>
            </h1>
        </header>
    );
};
