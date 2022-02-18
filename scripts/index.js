const elements = document.querySelector('.elements');
const buttonEdit = document.querySelector('.profile__edit-button');
const popupAdd = document.querySelector('.popup_type_add');
const popupEdit = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameEdit = document.querySelector('.form__input-field_type_name');
const descriptionEdit = document.querySelector('.form__input-field_type_description');
const buttonAdd = document.querySelector('.profile__add-button');
const placeTitle = document.querySelector('.form__input-field_type_place-title');
const placeLink = document.querySelector('.form__input-field_type_place-link');
const popupImage = document.querySelector('.popup_type_image');

function keyCode(evt) {
    const popupOpened = document.querySelector('.popup_opened'); 
    if (evt.key === 'Escape') {
        closePopup(popupOpened);
    }
}

function closeOnClick(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget);
    }
}

function renderCard(element) {
    elements.prepend(element);
}

buttonAdd.addEventListener('click', () => openPopup(popupAdd));
buttonEdit.addEventListener('click', () => {
    nameEdit.value = profileName.textContent;
    descriptionEdit.value = profileDescription.textContent;
    openPopup(popupEdit);
});

popupEdit.querySelector('.popup__close-button').addEventListener('click', () => closePopup(popupEdit));
popupAdd.querySelector('.popup__close-button').addEventListener('click', () => closePopup(popupAdd));
popupImage.querySelector('.popup__close-button').addEventListener('click', () => closePopup(popupImage));
popupEdit.querySelector('.form').addEventListener('submit', editSave);
popupAdd.querySelector('.form').addEventListener('submit', addSave);


function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', keyCode);
    popup.addEventListener('click', closeOnClick);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', keyCode);
    popup.removeEventListener('click', closeOnClick);
}

function editSave(evt) {
    evt.preventDefault();
    profileName.textContent = nameEdit.value;
    profileDescription.textContent = descriptionEdit.value;
    closePopup(popupEdit);
}

function addSave(evt) {
    evt.preventDefault();
    const card = new Card(evt, '#card');
    card.link = placeLink.value;
    card.name = placeTitle.value;
    const cardElement = card.generateCard(popupImage, openPopup);
    renderCard(cardElement);
    closePopup(popupAdd);
    evt.target.reset();
}

const initialCards = [
    {
   name: 'Карачаевск',
   link: './images/element-karachaevsk.jpg'
},
{
   name: 'Гора Эльбрус',
   link: './images/element-elbrus.jpg'
},
{
   name: 'Домбай',
   link: './images/element-dombay.jpg'
},
{
   name: 'Чжанъе Данься',
   link: './images/element-zhangye-danxia.jpg'
},
{
   name: 'Йосемити',
   link: './images/element-yosemite.jpg'
},
{
   name: 'Памуккале',
   link: './images/element-pamukkale.jpg'
}
];

initialCards.forEach((element) => {
    const card = new Card(element, '#card');
    const cardElement = card.generateCard(popupImage, openPopup);

    renderCard(cardElement);
});

const formSelectors = {
    inputSelector: '.form__input-field',
    submitButtonSelector: '.form__submit-button',
    disabledButtonSelector: 'form__submit-button_disabled',
    inputErrorSelector: 'form__input-field_type_error',
    errorSelector: 'form__error_visible'
};

const formAdd = new FormValidator(formSelectors, 'add');
formAdd.enableValidation();

const formEdit = new FormValidator(formSelectors, 'edit');
formEdit.enableValidation();

import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';