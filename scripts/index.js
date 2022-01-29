const cardTemplate = document.querySelector('#card').content;
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

function createCard(name, link) {
    const element = cardTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.element__image').src = link;
    element.querySelector('.element__name').textContent = name;
    element.querySelector('.element__image').alt = name;
    element.querySelector('.element__like-button').addEventListener(
        'click', evt => evt.target.classList.toggle('element__like-button_active'));

    element.querySelector('.element__remove-button').addEventListener(
        'click', evt => evt.target.closest('.element').remove());

    element.querySelector('.element__image').addEventListener('click', () => {
        popupImage.querySelector('.popup__image').src = link;
        popupImage.querySelector('.popup__image-title').textContent = name;
        popupImage.querySelector('.popup__image').alt = name;
        openPopup(popupImage);
    });
    return element;
}

initialCards.forEach((element) => {
    const card = createCard(element.name, element.link);
    renderCard(card);
});

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
    renderCard(createCard(placeTitle.value, placeLink.value));
    closePopup(popupAdd);
    evt.target.reset();
}