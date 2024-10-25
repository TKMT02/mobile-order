import React from 'react';
import Logo from '../img/logo-row.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Hmbmenu } from './Hmbmenu';


export const Header = (props) => {

    const navigate = useNavigate();

    const handleCart = () => {
        navigate("/cart");
    }

    const handleOrder = () => {
        navigate("/order");
    }

    return (
        <header className="header">
            <Hmbmenu />
            <h1 onClick={handleOrder}>
                <img src={Logo} alt="クラフト推しドリンク" className='header_image' />
            </h1>
            <p className={props.cartCount ? 'icon cart count' : 'cart icon'}
                data-count={props.cartCount}
                onClick={handleCart}
                onTouchStart={handleCart}>
                <FontAwesomeIcon
                    icon={faCartShopping}
                />
            </p>
        </header >
    );
};
