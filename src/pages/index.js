import './../pages/index.css'

import {Card} from '../scripts/Card.js';
import {FormValidator} from '../scripts/FormValidator';
import Section from '../scripts/Section';
import PopupWithImage from '../scripts/PopupWithImage.js';
import UserInfo from '../scripts/UserInfo.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupConfirm from '../scripts/PopupConfirm';
import Api from '../scripts/Api.js';

const buttonEdit = document.querySelector('.profile__edit-button');
const nameEdit = document.querySelector('.form__input-field_type_name');
const descriptionEdit = document.querySelector('.form__input-field_type_description');
const buttonAdd = document.querySelector('.profile__add-button');
const placeTitle = document.querySelector('.form__input-field_type_place-title');
const placeLink = document.querySelector('.form__input-field_type_place-link');
const buttonAvatar = document.querySelector('.profile__edit-avatar');
const formSelectors = {
  inputSelector: '.form__input-field',
  submitButtonSelector: '.form__submit-button',
  disabledButtonSelector: 'form__submit-button_disabled',
  inputErrorSelector: 'form__input-field_type_error',
  errorSelector: 'form__error_visible'
};

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-38',
    headers: {
      authorization: 'c25d5e93-56a4-4d00-9904-66eef2ea3711',
      'Content-Type': 'application/json'
    }
});

const popupAvatar = new PopupWithForm('.popup_type_edit-avatar', (data) => {
  renderLoading(true, 'avatar');
  api.updateProfile(data, true)
    .then((res) => {
      const avatar = document.querySelector('.profile__avatar');
      avatar.src = res.avatar;
      avatar.onload = popupAvatar.close();
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
    .finally(() => renderLoading(false, 'avatar'));
});

const popupAdd = new PopupWithForm('.popup_type_add', (data) => {
  renderLoading(true, 'add');
  api.addCard(data)
    .then((res) => {

      const card = createCard(res);
      cardList.addItem(card);
      popupAdd.close();
      
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
    .finally(() => renderLoading(false, 'add'));
});

const popupEdit = new PopupWithForm('.popup_type_edit', (data) => {
  renderLoading(true, 'edit');
  api.updateProfile(data, false)
    .then((res) => {
      user.setUserInfo(res.name, res.about);
      popupEdit.close();
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
    .finally(() => renderLoading(false, 'edit'));
});

const popupConfirm = new PopupConfirm('.popup_type_confirm', (evt) => {
  evt.preventDefault();
  api.deleteCard(evt.target.id)
    .then(document.getElementById(evt.target.id).closest('.element').remove())
    .then(popupConfirm.close())
    .catch(err => console.log(`Ошибка.....: ${err}`))
});
  
const popupImage = new PopupWithImage('.popup_type_image');
const user = new UserInfo({ name: '.profile__name', description: '.profile__description'});
const cardList = new Section(
  (item) => {

    const card = createCard(item);
    cardList.addItem(card);

  }, '.elements');

const formAdd = new FormValidator(formSelectors, 'add');
const formEdit = new FormValidator(formSelectors, 'edit');
const formAvatar = new FormValidator(formSelectors, 'avatar');

function renderLoading(state, form) {
  const button = document.forms[form].querySelector('.form__submit-button');
  state ? button.textContent = 'Сохранение...' : button.textContent = 'Сохранить';
}

function createCard(element) {
  const card = new Card(
      element,
      '#card',
      (evt) => popupImage.open(evt),
      (evt) => popupConfirm.open(evt), 
      (evt) => {
        const element = evt.target.closest('.element');
        const likeCount = element.querySelector('.element__like-count');

        if (!evt.target.classList.contains('element__like-button_active'))
          {
            api.toggleLike(element.id, 'PUT')
              .then(res => {
                likeCount.textContent = res.likes.length;
                evt.target.classList.add('element__like-button_active');
              })
              .catch(err => console.log(`Ошибка.....: ${err}`))
          }
        else {
          api.toggleLike(element.id, 'DELETE')
            .then(res => {
              res.likes.length > 0 ? 
              likeCount.textContent = res.likes.length : likeCount.textContent = '';
              evt.target.classList.remove('element__like-button_active');
            })
            .catch(err => console.log(`Ошибка.....: ${err}`))  
            }
      });
  const cardElement = card.generateCard();

  return cardElement;
}

buttonAdd.addEventListener('click', () => {
    placeTitle.value = '';
    placeLink.value = '';
    formAdd.resetValidation();
    popupAdd.open();
});

buttonEdit.addEventListener('click', () => {
    nameEdit.value = user.getUserInfo().name;
    descriptionEdit.value = user.getUserInfo().description;
    formEdit.resetValidation();
    popupEdit.open();
});

buttonAvatar.addEventListener('click', () => {
  formAvatar.resetValidation();
  popupAvatar.open();
});

popupAvatar.setEventListeners();
popupAdd.setEventListeners();
popupEdit.setEventListeners();
popupConfirm.setEventListeners();

api.getAppInfo()
    .then(([cardsArray, userData]) => {
      user.setUserInfo(userData.name, userData.about);
      document.querySelector('.profile').id = userData._id;
      document.querySelector('.profile__avatar').src = userData.avatar;

      cardList.renderItems(cardsArray);
    })
    .catch(err => console.log(err));

formAdd.enableValidation();
formEdit.enableValidation();
formAvatar.enableValidation();