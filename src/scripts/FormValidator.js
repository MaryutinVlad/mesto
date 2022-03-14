class FormValidator {
    
    constructor(data, selector) {
        this._form = document.forms[selector];
        this._inputList = Array.from(this._form.querySelectorAll(data.inputSelector));
        this._submitButton = this._form.querySelector(data.submitButtonSelector);
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
        this._toggleButtonState(this._inputList, this._submitButton);
        this._inputList.forEach((inputElement) => {
           this._hideErrorMessage(inputElement, this._form);
        });
    }

    _setEventListeners() {
        this._toggleButtonState(this._inputList, this._submitButton);
        this._inputList.forEach((inputField) => {
            inputField.addEventListener ('input', () => {
                this._checkInputValidity(this._form, inputField);
                this._toggleButtonState(this._inputList, this._submitButton);
            });
        });
    }

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._form.addEventListener('reset', () => {
            this._disableSubmitButton(this._submitButton);
        });
        this._setEventListeners();
    }
}

export {FormValidator};