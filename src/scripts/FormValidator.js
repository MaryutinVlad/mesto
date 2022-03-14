class FormValidator {
    constructor(data, selector) {
        this._formSelector = selector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._disabledButtonSelector = data.disabledButtonSelector;
        this._inputErrorSelector = data.inputErrorSelector;
        this._errorSelector = data.errorSelector;
    }

    _disableSubmitButton(button) {
        button.classList.add(this._disabledButtonSelector);
        button.setAttribute('disabled', '');
    }

    _checkInputValidity(formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showErrorMessage(inputElement, inputElement.validationMessage, formElement);
        }
        else {
            this._hideErrorMessage(inputElement, formElement);
        }
    }

    _showErrorMessage(inputElement, errorMessage, formElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorSelector);
        errorElement.classList.add(this._errorSelector);
        errorElement.textContent = errorMessage;
    }

    _hideErrorMessage(inputElement, formElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorSelector);
        errorElement.classList.remove(this._errorSelector);
        errorElement.textContent = '';
    }

    _hasInvalidInput(inputList) {
        return inputList.some( (element) => {
            return !element.validity.valid;
        });
    }

    _toggleButtonState(inputList, button) {
        if (this._hasInvalidInput(inputList)) {
            this._disableSubmitButton(button, this._disabledButtonSelector);
        }
        else {
            button.classList.remove(this._disabledButtonSelector);
            button.removeAttribute('disabled', '');
        }
    }

    resetValidation() {
        this._form = document.forms[this._formSelector]; 
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._button = this._form.querySelector(this._submitButtonSelector);

        this._toggleButtonState(this._inputList, this._button);
        this._inputList.forEach((inputElement) => {
           this._hideErrorMessage(inputElement, this._form);
        });
    }

    _setEventListeners(form) {
        const inputList = Array.from(form.querySelectorAll(this._inputSelector));
        const submitButton = form.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList, submitButton);
        inputList.forEach((inputField) => {
            inputField.addEventListener ('input', () => {
                this._checkInputValidity(form, inputField);
                this._toggleButtonState(inputList, submitButton);
            });
        });
    }

    enableValidation() {
        this._formElement = document.forms[this._formSelector];
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._formElement.addEventListener('reset', (evt) => {
            const button = evt.target.querySelector(this._submitButtonSelector);
            this._disableSubmitButton(button);
        });
        this._setEventListeners(this._formElement);
    }
}

export {FormValidator};