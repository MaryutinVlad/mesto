 //размещение карточек при загрузке

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

const cardTemplate = document.querySelector('#card').content;
const elements = document.querySelector('.elements');

for ( let i = 0; i < initialCards.length; i ++) {
   const element = cardTemplate.querySelector('.element').cloneNode(true);
   element.querySelector('.element__image').src = initialCards[i].link;
   element.querySelector('.element__name').textContent = initialCards[i].name;
   element.querySelector('.element__like-button').addEventListener('click', evt => evt.target.classList.toggle('element__like-button_active'));
   element.querySelector('.element__remove-button').addEventListener('click', evt => evt.target.closest('.element').remove());
   element.querySelector('.element__image').addEventListener('click', function imageOpen() {
       popupImage.querySelector('.popup__image').src = element.querySelector('.element__image').src;
       popupImage.querySelector('.popup__image-title').textContent = element.querySelector('.element__name').textContent;
       popupImage.classList.add('popup_status_opened');
       popupImage.classList.remove('popup_status_closed');
});
   elements.append(element);
}

//переменные

const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelectorAll('.popup__close-button');
const popupAdd = document.querySelector('.popup_type_add');
const popupEdit = document.querySelector('.popup_type_edit');
const saveButton = document.querySelector('.form__submit-button_type_save');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const editName = document.querySelector('.form__input-field_type_name');
const editDescription = document.querySelector('.form__input-field_type_description');
const likeButton = document.querySelector('.element__like-button');
const addButton = document.querySelector('.profile__add-button');
const placeTitle = document.querySelector('.form__input-field_type_place-title');
const placeLink = document.querySelector('.form__input-field_type_place-link');
const createButton = document.querySelector('.form__submit-button_type_create');
const popupImage = document.querySelector('.popup_type_image');

//события

addButton.addEventListener('click', addOpen);
editButton.addEventListener('click', editOpen);
closeButton[0].addEventListener('click', editClose);
closeButton[1].addEventListener('click', addClose);
closeButton[2].addEventListener('click', imageClose);
saveButton.addEventListener('click', editSave);
createButton.addEventListener('click', addSave);

function imageClose() {
    popupImage.classList.add('popup_status_closed');
    popupImage.classList.remove('popup_status_opened');
}

function addOpen() {
    popupAdd.classList.add('popup_status_opened');
    popupAdd.classList.remove('popup_status_closed');
}

function editOpen() {
    popupEdit.classList.add('popup_status_opened');
    popupEdit.classList.remove('popup_status_closed');  
}

function editClose() {
    popupEdit.classList.add('popup_status_closed');
    popupEdit.classList.remove('popup_status_opened');
}

function addClose() {
    popupAdd.classList.add('popup_status_closed');
    popupAdd.classList.remove('popup_status_opened');
}

function editSave(evt) {
    evt.preventDefault();
    profileName.textContent = editName.value;
    profileDescription.textContent = editDescription.value;
    editClose();
}

function addSave(evt) {
    evt.preventDefault();
    const element = cardTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.element__image').src = placeLink.value;
    element.querySelector('.element__name').textContent = placeTitle.value;
    element.querySelector('.element__like-button').addEventListener('click', evt => evt.target.classList.toggle('element__like-button_active'));
    element.querySelector('.element__remove-button').addEventListener('click', evt => evt.target.closest('.element').remove());
    element.querySelector('.element__image').addEventListener('click', function imageOpen() {
        popupImage.querySelector('.popup__image').src = element.querySelector('.element__image').src;
        popupImage.querySelector('.popup__image-title').textContent = element.querySelector('.element__name').textContent;
        popupImage.classList.add('popup_status_opened');
        popupImage.classList.remove('popup_status_closed');
    });
    elements.prepend(element);
    addClose();
}