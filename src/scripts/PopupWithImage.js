import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{

    open(evt) {
        this._popupElement.querySelector('.popup__image').src = evt.target.src;
        this._popupElement.querySelector('.popup__image').alt = evt.target.alt;
        this._popupElement.querySelector('.popup__image-title').textContent = evt.target.alt;
        super.open();
    }
}