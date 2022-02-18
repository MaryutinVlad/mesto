import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

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

function closeOnKeyCode(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
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

buttonAdd.addEventListener('click', () => {
    placeTitle.value = '';
    placeLink.value = '';
    formAdd._resetValidation();
    openPopup(popupAdd)
});

buttonEdit.addEventListener('click', () => {
    nameEdit.value = profileName.textContent;
    descriptionEdit.value = profileDescription.textContent;
    formEdit._resetValidation();
    openPopup(popupEdit);
});

popupEdit.querySelector('.popup__close-button').addEventListener('click', () => closePopup(popupEdit));
popupAdd.querySelector('.popup__close-button').addEventListener('click', () => closePopup(popupAdd));
popupImage.querySelector('.popup__close-button').addEventListener('click', () => closePopup(popupImage));
popupEdit.querySelector('.form').addEventListener('submit', editSave);
popupAdd.querySelector('.form').addEventListener('submit', addSave);


function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeOnKeyCode);
    popup.addEventListener('click', closeOnClick);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeOnKeyCode);
    popup.removeEventListener('click', closeOnClick);
}

function editSave(evt) {
    evt.preventDefault();
    profileName.textContent = nameEdit.value;
    profileDescription.textContent = descriptionEdit.value;
    closePopup(popupEdit);
}

function createCard(element) {
    const card = new Card(element, '#card');
    const cardElement = card.generateCard(popupImage, openPopup);

    return cardElement;
}

function addSave(evt) {
    evt.preventDefault();

    renderCard(createCard({
        name: placeTitle.value,
        link: placeLink.value
}, '#card'));

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
    renderCard(createCard(element, '#card'));
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