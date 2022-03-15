import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

    constructor (selector, formSubmit) {
        super(selector);
        this._formSubmit = formSubmit;
    }

    _getInputValues() {
        const inputData = 
           [...this._popupElement.querySelectorAll('.form__input-field')]
           .map((inputField) => inputField.value);
        const inputValues = {firstField: inputData[0], secondField: inputData[1]};
        
        return inputValues;
    }

    setEventListeners() {
        this._popupElement.querySelector('.form').addEventListener('submit', () => {
            this._formSubmit(this._getInputValues());
        });
    }

    close() {

        super.close();
        this._popupElement.querySelector('.form').reset();
    }
}