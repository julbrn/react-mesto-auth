import React from 'react';
import Popup from "./Popup";
import successIcon from '../images/successIcon.svg'
import failureIcon from '../images/failureIcon.svg'

function InfoTooltip({isSuccessful}) {
    return (
        <>
                <img
                    className="popup__icon"
                    src={isSuccessful ? successIcon : failureIcon}
                    alt={isSuccessful ? 'Успешная регистрация' : 'Ошибка! Попробуйте ещё раз.'}
                />
                <p className="popup__text">
                    {isSuccessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так!' +
                        ' Попробуйте ещё раз.'}
                </p>
        </>
    )
}

export default InfoTooltip;