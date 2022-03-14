import './../pages/index.css'

import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import PopupWithForm from './PopupWithForm.js';
import karachaevskImage from '../images/element-karachaevsk.jpg';
import elbrusImage from '../images/element-elbrus.jpg';
import dombayImage from '../images/element-dombay.jpg';
import zhangyedanxiaImage from '../images/element-zhangye-danxia.jpg';
import yosemiteImage from '../images/element-yosemite.jpg';
import pamukkaleImage from '../images/element-pamukkale.jpg';

const buttonEdit = document.querySelector('.profile__edit-button');
const nameEdit = document.querySelector('.form__input-field_type_name');
const descriptionEdit = document.querySelector('.form__input-field_type_description');
const buttonAdd = document.querySelector('.profile__add-button');
const placeTitle = document.querySelector('.form__input-field_type_place-title');
const placeLink = document.querySelector('.form__input-field_type_place-link');

buttonAdd.addEventListener('click', () => {
    placeTitle.value = '';
    placeLink.value = '';
    formAdd.resetValidation();
    popupAdd.open();
    popupAdd.setEventListeners();
});

buttonEdit.addEventListener('click', () => {
    nameEdit.value = user.getUserInfo().name;
    descriptionEdit.value = user.getUserInfo().description;
    formEdit.resetValidation();
    popupEdit.open();
    popupEdit.setEventListeners();
});

function createCard(element) {
    const card = new Card(element, '#card', (evt) => {popupImage.open(evt); popupImage.setEventListeners()});
    const cardElement = card.generateCard();

    return cardElement;
}

const initialCards = [
    {
   name: 'Карачаевск',
   link: karachaevskImage
},
{
   name: 'Гора Эльбрус',
   link: elbrusImage
},
{
   name: 'Домбай',
   link: dombayImage
},
{
   name: 'Чжанъе Данься',
   link: zhangyedanxiaImage
},
{
   name: 'Йосемити',
   link: yosemiteImage
},
{
   name: 'Памуккале',
   link: pamukkaleImage
}
];

const formSelectors = {
    inputSelector: '.form__input-field',
    submitButtonSelector: '.form__submit-button',
    disabledButtonSelector: 'form__submit-button_disabled',
    inputErrorSelector: 'form__input-field_type_error',
    errorSelector: 'form__error_visible'
};

const popupAdd = new PopupWithForm('.popup_type_add', (evt) => {
    evt.preventDefault();

    const card = new Section({
        items: {
            name: placeTitle.value,
            link: placeLink.value 
        },
        renderer: (item) => {
            const cardElement = createCard(item);
            card.addItem(cardElement);
        }
    }, '.elements');
    
    card.renderItems();

    popupAdd.close();
    evt.target.reset();
});

const popupEdit = new PopupWithForm('.popup_type_edit', (evt) => {
    evt.preventDefault();
    user.setUserInfo(popupEdit.setEventListeners());
    popupEdit.close();
});

const popupImage = new PopupWithImage('.popup_type_image');

const user = new UserInfo({ name: '.profile__name', description: '.profile__description'});

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = createCard(item);
        cardList.addItem(card);
    }
}, '.elements');

cardList.renderItems();

const formAdd = new FormValidator(formSelectors, 'add');
formAdd.enableValidation();

const formEdit = new FormValidator(formSelectors, 'edit');
formEdit.enableValidation();