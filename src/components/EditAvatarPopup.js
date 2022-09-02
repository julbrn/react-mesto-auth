import {useContext, useEffect, useRef} from 'react';
import Input from "./Input";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading, loadingText}) {
    const currentUser = useContext(CurrentUserContext);
    const avatarRef = useRef();
    useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }
    return (<PopupWithForm
    name='edit-avatar'
    title='Обновить аватар'
    buttonText='Сохранить'
    onClose = {onClose}
    isOpen={isOpen}
    onSubmit={handleSubmit}
    isLoading={isLoading}
    loadingText={loadingText}>
    <Input
        type="url"
        placeholder="Ссылка на аватар"
        name="avatarLink"
        id="avatarUrl-input"
        avatarRef={avatarRef}
    />
</PopupWithForm>)
}

export default EditAvatarPopup;