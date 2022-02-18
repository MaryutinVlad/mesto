class Card {
    constructor(data, selector) {
        this.name = data.name;
        this.link = data.link;
        this._selector = selector;
    }

    _getElement() {        
        const cardElement = document
        .querySelector(this._selector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    generateCard(popup, func) {
        this._element = this._getElement();
        this._setDecoration();
        this._setLikeEvent();
        this._setRemoveEvent();
        this._setScaleEvent(popup, func);

        return this._element;
    }

    _setDecoration() {
        this._element.querySelector('.element__image').src = this.link;
        this._element.querySelector('.element__image').alt = this.name;
        this._element.querySelector('.element__name').textContent = this.name;
    }

    _setLikeEvent() {
        this._element.querySelector('.element__like-button').addEventListener(
            'click', evt => evt.target.classList.toggle('element__like-button_active')); 
    }

    _setRemoveEvent() {
        this._element.querySelector('.element__remove-button').addEventListener(
            'click', evt => evt.target.closest('.element').remove());
    }

    _setScaleEvent(popup, func) {
        this._element.querySelector('.element__image').addEventListener('click', (evt) => {
            popup.querySelector('.popup__image').src = this.link;
            popup.querySelector('.popup__image-title').textContent = this.name;
            popup.querySelector('.popup__image').alt = this.name;
            func(popup);
        });
    }
}

export {Card};