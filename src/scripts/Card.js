class Card {
    constructor(data, selector, handleCardClick) {
        this.name = data.name;
        this.link = data.link;
        this._selector = selector;
        this.handleCardClick = handleCardClick;
    }

    _getElement() {        
        const cardElement = document
        .querySelector(this._selector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getElement();
        this._setDecoration();
        this._setEventListeners();

        return this._element;
    }

    _setDecoration() {
        const elementImage = this._element.querySelector('.element__image');
        elementImage.src = this.link;
        elementImage.alt = this.name;
        this._element.querySelector('.element__name').textContent = this.name;
    }

    _setLike(evt) {
        evt.target
        .classList
        .toggle('element__like-button_active');
    }

    _setRemove() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like-button').addEventListener(
            'click', (evt) => this._setLike(evt)
            );
        this._element.querySelector('.element__remove-button').addEventListener(
            'click', (evt) => this._setRemove(evt)
            );
        this._element.querySelector('.element__image').addEventListener(
            'click', this.handleCardClick
        );
    }
}

export {Card};