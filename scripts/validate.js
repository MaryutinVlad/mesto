function disableSubmitButton(button, selector) {
    button.classList.add(selector);
    button.setAttribute('disabled', '');
}

const enableValidation = (elements) => {

    const checkInputValidity = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            showErrorMessage(inputElement, inputElement.validationMessage, formElement);
        }
        else {
            hideErrorMessage(inputElement, formElement);
        }
    };
    
    const showErrorMessage = (inputElement, errorMessage, formElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(elements.inputErrorSelector);
        errorElement.classList.add(elements.errorSelector);
        errorElement.textContent = errorMessage;
    };
    
    const hideErrorMessage = (inputElement, formElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(elements.inputErrorSelector);
        errorElement.classList.remove(elements.errorSelector);
        errorElement.textContent = '';
    };
    
    const hasInvalidInput = (inputList) => {
        return inputList.some( (element) => {
            return !element.validity.valid;
        });
    };
    
    const toggleButtonState = (inputList, button) => {
        if (hasInvalidInput(inputList)) {
            disableSubmitButton(button, elements.disabledButtonSelector);
        }
        else {
            button.classList.remove(elements.disabledButtonSelector);
            button.removeAttribute('disabled', '');
        }
    };
    
    const setEventListeners = (form) => {
        const inputList = Array.from(form.querySelectorAll(elements.inputSelector));
        const submitButton = form.querySelector(elements.submitButtonSelector);
        toggleButtonState(inputList, submitButton);
        inputList.forEach((inputField) => {
            inputField.addEventListener ('input', () => {
                checkInputValidity(form, inputField);
                toggleButtonState(inputList, submitButton);
            });
        });
    };
    const formList = Array.from(document.querySelectorAll(elements.formSelector));
    formList.forEach((form) => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(form);
    });
};

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input-field',
    submitButtonSelector: '.form__submit-button',
    disabledButtonSelector: 'form__submit-button_disabled',
    inputErrorSelector: 'form__input-field_type_error',
    errorSelector: 'form__error_visible'
});