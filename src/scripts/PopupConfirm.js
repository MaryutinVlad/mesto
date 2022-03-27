import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
    constructor (selector, formSubmit) {
        super(selector);
        this._formSubmit = formSubmit;
    }

    open(evt) {
        this._popupElement.querySelector('.form__submit-button').id = evt.target.id;
        super.open()
    }

    setEventListeners() {
        this._popupElement.querySelector('.form__submit-button').addEventListener('click', 
            this._formSubmit
        );
    }
}