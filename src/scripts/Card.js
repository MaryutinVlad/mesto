class Card {
    constructor(data, selector, handleCardClick, handleRemoveClick, handleLikeClick) {
        this.name = data.name;
        this.link = data.link;
        this._selector = selector;
        this.handleCardClick = handleCardClick;
        this.handleRemoveClick = handleRemoveClick;
        this.handleLikeClick = handleLikeClick;
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
        console.log(this._element);
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like-button').addEventListener(
            'click', this.handleLikeClick
        );
        this._element.querySelector('.element__like-button').addEventListener(
            'click', this._setLike
        );
        this._element.querySelector('.element__remove-button').addEventListener(
            'click', this.handleRemoveClick
        );
        this._element.querySelector('.element__image').addEventListener(
            'click', this.handleCardClick
        );
    }
}

export {Card};