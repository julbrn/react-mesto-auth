import React from 'react';

import successIcon from '../images/successIcon.svg'
import failureIcon from '../images/failureIcon.svg'

function InfoTooltip({isOpen, isSuccessful, onClose}) {
    return (
        <div className={`popup ${isOpen && 'popup_opened'}`} onClick={onClose}>
            <div className="popup__container popup__container_type_auth">
                <img
                    className="popup__icon"
                    src={isSuccessful ? successIcon : failureIcon}
                    alt={isSuccessful ? 'Успешная регистрация' : 'Ошибка! Попробуйте ещё раз.'}
                />
                <p className="popup__text">
                    {isSuccessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так!' +
                        ' Попробуйте ещё раз.'}
                </p>
                <button
                    onClick={onClose}
                    className="popup__close"
                    type="button"
                    >
                </button>
            </div>
        </div>
    )
}

export default InfoTooltip;