import React, {useEffect, useState} from 'react';
import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Input from "./Input";
import api from '../utils/api.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [cards, setCards] = useState([])
  const [card, setCard] = useState({})
  const [currentUser, setCurrentUser] = useState({
        name: '',
        about: '',
        avatar: '',
    });
  const [isLoading, setIsLoading] = useState(false);
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch((err) => {
                console.log(`${err}`);
            });
    }
    function handleCardDelete(card) {
        api.deleteCardfromServer(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id && c));
            })
            .catch((err) => {
                console.log(`${err}`);
            })
            .finally(() => {
                closeAllPopups();
            });
    }
  const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || selectedCard || isConfirmPopupOpen;
  useEffect(() => {
        Promise.all([api.getUserInfo(), api.downloadInitialCards()])
            .then(([userData, cardsData]) => {
                setCurrentUser(userData);
                setCards(cardsData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

  useEffect(() => {
      function handleEscapeClose(event) {
          if (event.key === 'Escape') {
              closeAllPopups()
          }
      }
      if (isOpen) {
          document.addEventListener('keydown', handleEscapeClose);
          return () => {
              document.removeEventListener('keydown', handleEscapeClose)
          }
      }
  }, [isOpen])


  function handleEditProfileClick() {setEditProfilePopupOpen(true);
  }
  function handleDeleteBtnClick(card) {setConfirmPopupOpen(true);  setCard(card);
    }
  function handleAddPlaceClick() {setAddPlacePopupOpen(true);
  }
  function closeAllPopups() {setEditProfilePopupOpen(false);setAddPlacePopupOpen(false);setEditAvatarPopupOpen(false);setSelectedCard(null);setConfirmPopupOpen(false)
  }
  function handleCardClick(card) {
      setSelectedCard(card);
  }

  function handleUpdateUser(inputdata) {
      setIsLoading(true)
      api.uploadUserInfo(inputdata)
          .then(user => {
              setCurrentUser(user);
              setEditProfilePopupOpen(false);
          })
          .catch((err) => {
              console.log(err);
          })
          .finally(()=> {
              setIsLoading(false)//
          })
  }

    function handleUpdateAvatar(data) {
        setIsLoading(true)
        api.editAvatar(data)
            .then(res => {
                setCurrentUser(res);
                setEditAvatarPopupOpen(false);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(()=> {
                setIsLoading(false)//
            })
    }

    function handleAddPlace(data) {
        setIsLoading(true)
        api.uploadCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                setAddPlacePopupOpen(false);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(()=> {
                setIsLoading(false)//
            })
    }

  return (
      <CurrentUserContext.Provider value={currentUser}>
      <div className="page"><Header/><Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          setCards={setCards}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteBtnClick}
      /><Footer/>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} loadingText="Сохранение..."/>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}  onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} loadingText="Сохранение..."/>
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} isLoading={isLoading} loadingText="Добавление..."/>
          <PopupWithForm
          name='deletion-confirmation'
          title='Вы уверены?'
          buttonText='Да'>
      </PopupWithForm><ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}>
      </ImagePopup>
          <DeleteConfirmationPopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onSubmit={handleCardDelete} card={card}/>
      </div>
      </CurrentUserContext.Provider>);
  }
export default App;

