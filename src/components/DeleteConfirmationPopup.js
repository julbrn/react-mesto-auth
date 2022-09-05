import React from 'react';
import PopupWithForm from "./PopupWithForm";
import Popup from "./Popup";

function DeleteConfirmationPopup({card, isOpen, onClose, onSubmit}) {
    function handleYesClick(e) {
        e.preventDefault();
        onSubmit(card);
    }
    return (
        <Popup
            popupModifier="deletion-confirmation"
            containerModifier="deletion-confirmation"
            isOpen={isOpen}
            onClose={onClose}
        >
        <PopupWithForm
            popupModifier="deletion-confirmation"
            title="Вы уверены?"
            buttonText="Да"
            onSubmit={handleYesClick}
        >
        </PopupWithForm>
        </Popup>
    )
}
export default DeleteConfirmationPopup;