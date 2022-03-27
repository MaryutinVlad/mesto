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
  api.updateProfile(data, true)
    .then((res) => {
      const avatar = document.querySelector('.profile__avatar');
      avatar.src = res.avatar;
      avatar.onload = popupAvatar.close();
    })
});

const popupAdd = new PopupWithForm('.popup_type_add', (data) => {
  addCard(data);
});

const popupEdit = new PopupWithForm('.popup_type_edit', (data) => {
  api.updateProfile(data, false)
    .then((res) => {
      user.setUserInfo(res.name, res.about);
      popupEdit.close();
    });
});

const popupConfirm = new PopupConfirm('.popup_type_confirm', (evt) => {
  evt.preventDefault();
  api.deleteCard(evt.target.id)
    .then(document.getElementById(evt.target.id).closest('.element').remove())
    .then(popupConfirm.close());
});

const popupImage = new PopupWithImage('.popup_type_image');
const user = new UserInfo({ name: '.profile__name', description: '.profile__description'});
const cardList = new Section({
    items: [],
    renderer: updateCards()
}, '.elements');
const formAdd = new FormValidator(formSelectors, 'add');
const formEdit = new FormValidator(formSelectors, 'edit');
const formAvatar = new FormValidator(formSelectors, 'avatar');

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
              .then(res => likeCount.textContent = res.likes.length);
          }
        else {
          api.toggleLike(element.id, 'DELETE')
            .then(res => res.likes.length > 0 ? 
              likeCount.textContent = res.likes.length : likeCount.textContent = '');
            }
      });
  const cardElement = card.generateCard();

  return cardElement;
}

function addCard(data) {

  return api.addCard(data)
    .then((res) => {

      const card = createCard({
        name: data.place,
        link: data.link
      });

      card.id = res._id;
      const removeButton = card.querySelector('.element__remove-button');
      removeButton.id = res._id;
      
      card.onload = cardList.addItem(card);
      popupAdd.close();
    });
}

function updateCards() {
  api.getInitialCards()
    .then((items) => {
      return items.forEach(item => {

        const card = createCard(item);
        const removeButton = card.querySelector('.element__remove-button');
        const myId = document.querySelector('.profile').id;
        card.id = item._id;

        if (item.owner._id !== myId) {   
          removeButton.style = 'visibility: hidden;';
        }
        else {
          removeButton.id = item._id;
        }
        if (item.likes.length > 0) {
          card.querySelector('.element__like-count').textContent = item.likes.length
        }

        item.likes.forEach((user) => {
          if (user._id === myId)
            {card.querySelector('.element__like-button').classList.add('element__like-button_active')}
          });

        cardList.addItem(card);
        });
    })
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

api.getUserData()
  .then(data => {
    user.setUserInfo(data.name, data.about);
    document.querySelector('.profile').id = data._id;
    document.querySelector('.profile__avatar').src = data.avatar;
  });

cardList.renderItems();
formAdd.enableValidation();
formEdit.enableValidation();
formAvatar.enableValidation();