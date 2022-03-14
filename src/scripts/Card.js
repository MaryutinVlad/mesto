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
        this._element.querySelector('.element__image').src = this.link;
        this._element.querySelector('.element__image').alt = this.name;
        this._element.querySelector('.element__name').textContent = this.name;
        console.log(this._element.querySelector('.element__image'));
    }

    _setLike(evt) {
        evt.target
        .classList
        .toggle('element__like-button_active');
    }

    _setRemove(evt) {
        evt.target.closest('.element').remove();    
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