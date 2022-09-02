import React from 'react';
import logo from "../images/header/logo.svg";

function Header() {
    return (
        <header className="header">
            <a href="src/components/App#" className="header__logo" target="_blank"
            ><img
                className="header__logo-img"
                src={logo}
                alt="Логотип Место"
            /></a>
        </header>
    );
}

export default Header;