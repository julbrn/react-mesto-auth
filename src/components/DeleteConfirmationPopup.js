import React from 'react';
import PopupWithForm from "./PopupWithForm";

function DeleteConfirmationPopup({card, isOpen, onClose, onSubmit}) {
    function handleYesClick(e) {
        e.preventDefault();
        onSubmit(card);
    }
    return (
        <PopupWithForm
            name="deletion-confirmation"
            title="Вы уверены?"
            buttonText="Да"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleYesClick}
        >
        </PopupWithForm>
    )
}
export default DeleteConfirmationPopup;