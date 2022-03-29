import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
    constructor (selector, formSubmit) {
        super(selector);
        this._formSubmit = formSubmit;
        this._submitButton = this._popupElement.querySelector('.form__submit-button');
    }

    open(evt) {
        this._submitButton.id = evt.target.closest('.element').id;
        super.open()
    }

    setEventListeners() {
        this._submitButton.addEventListener('click', 
            this._formSubmit
        );
    }
}