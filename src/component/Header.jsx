import React, { useState, useEffect } from 'react';
import Logo from '../img/logo-row.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Hmbmenu } from './Hmbmenu';


export const Header = (props) => {

    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    // // props.headerTitleが変更されたときだけsetTitleを実行
    // useEffect(() => {
    //     if (props.headerTitle) {
    //         setTitle(props.headerTitle);
    //     }
    // }, [props.headerTitle]); // props.headerTitleが変わったときのみ実行

    const handleMenu = () => {
        setIsModalOpen(true);
    }

    const handleCart = () => {
        navigate("/cart");
    }

    const closeModal = () => setIsModalOpen(false);

    return (
        <header className="header">
            <Hmbmenu />
            <h1>
                <img src={Logo} alt="クラフト推しドリンク" className='header_image' />
            </h1>
            <FontAwesomeIcon icon={faCartShopping} className='icon' onClick={handleCart} onTouchStart={handleCart} />

        </header>
    );
};
