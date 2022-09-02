import React from 'react';

function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_type_zoom-image ${card && "popup_opened"}`} onClick={onClose}>
            <div className="popup__figure-container" onClick={(event) => {event.stopPropagation()}}>
                <button onClick={onClose} type="button" aria-label="Close"
                 className="popup__close"></button>
                <figure className="popup__figure">
                    <img src={card && card.link} className="popup__image" alt={card && card.name}/>
                    <figcaption className="popup__caption">{card && card.name}</figcaption>
                </figure>
            </div>
        </div>
    );
}

export default ImagePopup;