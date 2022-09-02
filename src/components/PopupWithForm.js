import React from 'react';

function PopupWithForm({name, isOpen, onClose, onSubmit, title, children, isLoading, loadingText, buttonText}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={onClose}>
            <div className={`popup__container popup__container_type_${name}`} onClick={(event) => {event.stopPropagation()}}>
                <button onClick={onClose} type="button" aria-label="Close"
                 className="popup__close"/>
                <form className="popup__form" name={`${name}-form`} onSubmit={onSubmit}>
                    <fieldset className="popup__fieldset">
                        <legend className="popup__title">{title}</legend>
                        {children}
                        <button type="submit"
                                className="popup__submit-button popup__submit-button_active">{isLoading ? loadingText : buttonText}
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;