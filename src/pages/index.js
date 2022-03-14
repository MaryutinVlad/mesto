import './../pages/index.css'

import {Card} from '../scripts/Card.js';
import {FormValidator} from '../scripts/FormValidator';
import Section from '../scripts/Section';
import PopupWithImage from '../scripts/PopupWithImage.js';
import UserInfo from '../scripts/UserInfo.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import karachaevskImage from '../images/element-karachaevsk.jpg';
import elbrusImage from '../images/element-elbrus.jpg';
import dombayImage from '../images/element-dombay.jpg';
import zhangyedanxiaImage from '../images/element-zhangye-danxia.jpg';
import yosemiteImage from '../images/element-yosemite.jpg';
import pamukkaleImage from '../images/element-pamukkale.jpg';

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
});

buttonEdit.addEventListener('click', () => {
    nameEdit.value = user.getUserInfo().name;
    descriptionEdit.value = user.getUserInfo().description;
    formEdit.resetValidation();
    popupEdit.open();
});


function createCard(element) {
    const card = new Card(element, '#card', (evt) => popupImage.open(evt));
    const cardElement = card.generateCard();

    return cardElement;
}

const formSelectors = {
    inputSelector: '.form__input-field',
    submitButtonSelector: '.form__submit-button',
    disabledButtonSelector: 'form__submit-button_disabled',
    inputErrorSelector: 'form__input-field_type_error',
    errorSelector: 'form__error_visible'
};

const popupAdd = new PopupWithForm('.popup_type_add', () => {

    const card = createCard({
        name: placeTitle.value,
        link: placeLink.value
    });
    
    cardList.addItem(card);

    popupAdd.close();
});
popupAdd.setEventListeners();

const popupEdit = new PopupWithForm('.popup_type_edit', (data) => {

    user.setUserInfo(data.firstField, data.secondField);
    popupEdit.close();
});
popupEdit.setEventListeners();

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