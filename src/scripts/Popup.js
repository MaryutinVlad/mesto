export default class Popup {

    constructor(selector) {
        this._popupElement = document.querySelector(selector);
        this._closeButton = this._popupElement.querySelector('.popup__close-button');

        this._handleClickClose = this._handleClickClose.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
        this.close = this.close.bind(this);
    }

    open() {
        this._popupElement.classList.add('popup_opened');

        document.addEventListener('keydown', this._handleEscClose);
        document.addEventListener('click', this._handleClickClose);
        this._closeButton.addEventListener('click', this.close);
    }

    close() {
        this._popupElement.classList.remove('popup_opened');

        document.removeEventListener('keydown', this._handleEscClose);
        document.removeEventListener('click', this._handleClickClose);
        this._closeButton.removeEventListener('click', this.close);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleClickClose(evt) {
        if (evt.target === this._popupElement) {
            this.close();
        }
    }
}