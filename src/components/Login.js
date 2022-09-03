import React from 'react';
function Login(props) {
    return (
        <div className="auth">
            <h2 className="auth__heading">
                Вход
            </h2>
            <form className="auth__form" name="sign-in-form">
                <input className="auth__input"
                       id="email"
                       name="email"
                       type="email"
                       placeholder="Email"
                       required
                />
                <p className="auth__error" id="email-error"/>
                <input className="auth__input"
                       id="password"
                       name="password"
                       type="password"
                       placeholder="Пароль"
                       required
                />
                <p className="auth__error" id="email-error"/>
                <button type="submit" className="auth__button">
                    Войти
                </button>
            </form>
        </div>
    );
}
export default Login;