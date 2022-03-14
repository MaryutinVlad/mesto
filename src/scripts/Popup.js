export default class Popup {

    constructor(selector) {
        this._selector = document.querySelector(selector);
    }

    open() {
        this._selector.classList.add('popup_opened');
    }

    close() {
        this._selector.classList.remove('popup_opened');
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleClickClose(evt) {
        if (evt.target === this._selector) {
            this.close();
        }
    }

    setEventListeners() {
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
        document.addEventListener('click', (evt) => {
            this._handleClickClose(evt);
        });
        this._selector.querySelector('.popup__close-button')
        .addEventListener('click', () => this.close());
    }

    removeEventListeners() {
        document.removeEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
        document.removeEventListener('click', (evt) => {
            this._handleClickClose(evt);
        });
    }
}