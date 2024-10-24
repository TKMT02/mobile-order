import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import "../css/hmbmenu.css";

export const Hmbmenu = () => {

    const [isOpen, setIsOpen] = useState(false);
    const nav = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleMenu = (e) => {
        console.log(e);
        if (e == "menu") {
            nav('/order');
        } else if (e == "option") {
            nav('/option');
        } else if (e == "cart") {
            nav('/cart');
        }
    }

    return (
        <div className="hamburger-menu">
            <button className="menu-toggle" onClick={toggleMenu}>
                {isOpen ? (
                    <FontAwesomeIcon icon={faTimes} />
                ) : (
                    <FontAwesomeIcon icon={faBars} />
                )}
            </button>
            <div className={`menu ${isOpen ? 'open' : ''}`}>
                <ul>
                    <li onClick={() => handleMenu('menu')}>メニュー</li>
                    <li onClick={() => handleMenu('option')}>オプション</li>
                    <li onClick={() => handleMenu('cart')} >カート </li>
                </ul>
            </div>
        </div>
    );
};
