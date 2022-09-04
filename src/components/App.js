import React, {useEffect, useState} from 'react';
import {Route, Switch, Redirect, useHistory} from "react-router-dom";
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
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip";

function App() {
  let history = useHistory();
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false)
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isSuccessful, setSuccessful] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null)
  const [cards, setCards] = useState([])
  const [card, setCard] = useState({})
  const [currentUser, setCurrentUser] = useState({
        name: '',
        about: '',
        avatar: '',
    });
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
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
  const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || selectedCard || isConfirmPopupOpen || isInfoTooltipOpen;
  useEffect(() => {
      if (loggedIn) {
        Promise.all([api.getUserInfo(), api.downloadInitialCards()])
            .then(([userData, cardsData]) => {
                setCurrentUser(userData);
                setCards(cardsData);
            })
            .catch((err) => {
                console.log(err);
            });
    }}, [loggedIn]);

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
  function closeAllPopups() {setEditProfilePopupOpen(false);setAddPlacePopupOpen(false);setEditAvatarPopupOpen(false);setSelectedCard(null);setConfirmPopupOpen(false);setInfoTooltipOpen(false);
  }
  function handleCardClick(card) {
      setSelectedCard(card);
  }

  function handleUpdateUser(inputData) {
      setIsLoading(true)
      api.uploadUserInfo(inputData)
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
    function handleRegister(newUser) {
        setIsLoading(true);
        auth
            .register(newUser.email, newUser.password)
            .then(() => {
                setSuccessful(true);
                history.push('/sign-in');
                })

            .catch((err) => {
                setSuccessful(false);
                console.log(err);
                setInfoTooltipOpen(true)
            })
            .finally(() => {
                setInfoTooltipOpen(true)
            })
    }


    return (
      <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
          <Header/>
          <Switch>
              <Route path="/sign-up">
                  <Register
                   onRegister={handleRegister}
                  />
              </Route>
              <Route path="/sign-in">
                  <Login

                  />
              </Route>
              <ProtectedRoute  exact path="/"
          loggedIn={loggedIn}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          setCards={setCards}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteBtnClick}
          component={Main}
      />
          </Switch>
              <Footer/>
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
      <InfoTooltip
           isOpen={isInfoTooltipOpen}
           isSuccessful={isSuccessful}
           onClose={closeAllPopups}
      />
      </div>
      </CurrentUserContext.Provider>)
  }
export default App;

