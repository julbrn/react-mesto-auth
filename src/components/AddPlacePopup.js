import {useState, useEffect} from 'react';
import Input from "./Input";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({onClose, isOpen, onAddPlace, isLoading, loadingText}) {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    function handleCardTitle(event) {
        setTitle(event.target.value)
    }

    function handleCardLink(event) {
        setLink(event.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: title,
            link: link
        })
    }

    useEffect(() => {
        setTitle('');
        setLink('');
    }, [isOpen])

    return (<PopupWithForm
        name='add-card'
        title='Новое место'
        buttonText='Создать'
        onClose={onClose}
        isOpen={isOpen}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        loadingText={loadingText}>
        <Input
            type="text"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            name="name"
            id="placeName-input"
            onChange={handleCardTitle}
            value={title}
        />
        <Input
            type="url"
            placeholder="Ссылка на картинку"
            name="link"
            id="placeUrl-input"
            onChange={handleCardLink}
            value={link}
        />
    </PopupWithForm>)
}
export default AddPlacePopup