import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

    constructor (selector, formSubmit) {
        super(selector);
        this._formSubmit = formSubmit;
    }

    _getInputValues() {
        const inputData = 
           [...this._selector.querySelectorAll('.form__input-field')]
           .map((inputField) => inputField.value);
        
        return inputData;
    }

    setEventListeners() {
        super.setEventListeners();
        this._selector.addEventListener('submit', this._formSubmit);
        return this._getInputValues();
    }

    close() {
        super.close();
        this._selector.querySelector('.form').reset();
    }
}