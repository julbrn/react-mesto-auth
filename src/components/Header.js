import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../images/header/logo.svg";

function Header({onSignOut, email}) {
    const location = useLocation();
    return (
        <header className="header">
            <a href="#" className="header__logo" target="_blank"
            ><img
                className="header__logo-img"
                src={logo}
                alt="Логотип Место"
            /></a>
            {email && email}
            {email ? (
                <Link onClick={onSignOut} className="header__link" to="sign-in">
                    Выйти
                </Link>
            ) : (
                <Link className="header__link" to={location.pathname === '/sign-up' ? '/sign-in' : '/sign-up'}>
                    {location.pathname === '/sign-up' ? 'Вход' : 'Регистрация'}
                </Link>)}
        </header>
    );
}

export default Header;