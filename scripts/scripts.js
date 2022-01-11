 let editButton = document.querySelector('.profile__edit-button');
 let closeButton = document.querySelector('.popup__close-button');
 let popup = document.querySelector('.popup');
 let saveButton = document.querySelector('.edit-form__save-button');
 let profileName = document.querySelector('.profile__name');
 let profileDescription = document.querySelector('.profile__description');
 let editName = document.querySelector('.edit-form__input-field_type_name');
 let editDescription = document.querySelector('.edit-form__input-field_type_description');

 editButton.addEventListener('click', editOpen);
 closeButton.addEventListener('click', editClose);
 saveButton.addEventListener('click', submit);

function editOpen() {
    popup.classList.add('popup_opened');        
}

function editClose() {
    popup.classList.remove('popup_opened');
}

function submit(evt) {
    evt.preventDefault();
    profileName.textContent = editName.value;
    profileDescription.textContent = editDescription.value;
    popup.style.display = 'none';
}
