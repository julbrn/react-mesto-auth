import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import logo from "../images/header/logo.svg";

function Header({onSignOut, email, isLoggedIn}) {
    const location = useLocation();
    const [isClickedBurger, setIsClickedBurger] = useState(false);
    function handleClickBurgerMenu() {
        setIsClickedBurger(!isClickedBurger)
    }
    return (
        <header className={`header ${isLoggedIn ? 'header_mobile' : ''}`}>
            <a href="#" className="header__logo" target="_blank"
            ><img
                className="header__logo-img"
                src={logo}
                alt="Логотип Место"
            /></a>
            {email ? (
                <>
                <button className="burger" onClick={handleClickBurgerMenu}>
                        <span className={`${isClickedBurger ? 'burger__bar' +
                            ' burger__bar_cross' : 'burger__bar'}`}></span>
                        <span className={`${isClickedBurger ? 'burger__bar' +
                            ' burger__bar_cross' : 'burger__bar'}`}></span>
                        <span className={`${isClickedBurger ? 'burger__bar' +
                            ' burger__bar_cross' : 'burger__bar'}`}></span>
                </button>
                <div className={`${isClickedBurger  ? 'header__container' : 'header__container' +
                    ' header__container_inactive'}`}>
                <p className="header__email">{email}</p>
                <Link onClick={onSignOut} className="header__link" to="sign-in">
                    Выйти
                </Link>
                </div>
                </>
            ) : (
                <Link className="header__link" to={location.pathname === '/sign-up' ? '/sign-in' : '/sign-up'}>
                    {location.pathname === '/sign-up' ? 'Вход' : 'Регистрация'}
                </Link>)}
        </header>
    );
}

export default Header;