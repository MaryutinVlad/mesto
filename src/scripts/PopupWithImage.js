import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{

    open(evt) {
        this._selector.querySelector('.popup__image').src = evt.target.src;
        this._selector.querySelector('.popup__image').alt = evt.target.alt;
        this._selector.querySelector('.popup__image-title').textContent = evt.target.alt;
        super.open();
    }
}