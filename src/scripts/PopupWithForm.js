import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

    constructor (selector, formSubmit) {
        super(selector);
        this._formSubmit = formSubmit;
    }

    _getInputValues() {
        this._inputList = this._popupElement.querySelectorAll('.form__input-field');
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);

        return this._formValues; 
    }

    setEventListeners() {
        this._popupElement.querySelector('.form').addEventListener('submit', (evt) => {
            evt.preventDefault();
            evt.target.querySelector('.form__submit-button').textContent = 'Сохранение...';
            this._formSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._popupElement.querySelector('.form').reset();
        this._popupElement.querySelector('.form__submit-button').textContent = 'Сохранить';
    }
}