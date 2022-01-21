const cardTemplate = document.querySelector('#card').content;
const elements = document.querySelector('.elements');
const editButton = document.querySelector('.profile__edit-button');
const popupAdd = document.querySelector('.popup_type_add');
const popupEdit = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const editName = document.querySelector('.form__input-field_type_name');
const editDescription = document.querySelector('.form__input-field_type_description');
const addButton = document.querySelector('.profile__add-button');
const placeTitle = document.querySelector('.form__input-field_type_place-title');
const placeLink = document.querySelector('.form__input-field_type_place-link');
const popupImage = document.querySelector('.popup_type_image');


function renderCard(element) {
    elements.prepend(element);
}

function createCard(name, link) {
    const element = cardTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.element__image').src = link;
    element.querySelector('.element__name').textContent = name;
    element.querySelector('.element__image').alt = name;
    element.querySelector('.element__like-button').addEventListener('click', evt => evt.target.classList.toggle('element__like-button_active'));
    element.querySelector('.element__remove-button').addEventListener('click', evt => evt.target.closest('.element').remove());
    element.querySelector('.element__image').addEventListener('click', () => {
        popupImage.querySelector('.popup__image').src = link;
        popupImage.querySelector('.popup__image-title').textContent = name;
        popupImage.querySelector('.popup__image').alt = name;
        openPopup(popupImage);
    });
    renderCard(element);
}

initialCards.forEach((card) => {
    createCard(card.name, card.link);
});


addButton.addEventListener('click', () => openPopup(popupAdd));
editButton.addEventListener('click', () => {
    editName.value = profileName.textContent;
    editDescription.value = profileDescription.textContent;
    openPopup(popupEdit);
});

popupEdit.querySelector('.popup__close-button').addEventListener('click', () => closePopup(popupEdit));
popupAdd.querySelector('.popup__close-button').addEventListener('click', () => closePopup(popupAdd));
popupImage.querySelector('.popup__close-button').addEventListener('click', () => closePopup(popupImage));
popupEdit.querySelector('.form').addEventListener('submit', editSave);
popupAdd.querySelector('.form').addEventListener('submit', addSave);


function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function editSave(evt) {
    evt.preventDefault();
    profileName.textContent = editName.value;
    profileDescription.textContent = editDescription.value;
    closePopup(popupEdit);
}

function addSave(evt) {
    evt.preventDefault();
    createCard(placeTitle.value, placeLink.value);
    closePopup(popupAdd);
    evt.target.reset();
}