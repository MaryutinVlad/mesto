class Card {
    constructor(data, selector, handleCardClick, handleRemoveClick, handleLikeClick) {
        this.name = data.name;
        this.link = data.link;
        this.likes = data.likes;
        this.owner = data.owner._id;
        this.id = data._id;
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
        this._element.id = this.id;

        return this._element;
    }

    _setDecoration() {
        const elementImage = this._element.querySelector('.element__image');
        const elementLike = this._element.querySelector('.element__like-count');
        const profileId = document.querySelector('.profile').id;
        
        elementImage.src = this.link;
        elementImage.alt = this.name;
        this._element.querySelector('.element__name').textContent = this.name;

        this.likes.length > 0 ? 
          elementLike.textContent = this.likes.length :
          elementLike.textContent = '';

        this.likes.forEach((like) => {
            if (like._id === profileId) {
                this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
            }
        })

        if (this.owner !== profileId) {
            this._element.querySelector('.element__remove-button').style = 'visibility: hidden;';
        }
    }
    
    _setEventListeners() {
        this._element.querySelector('.element__like-button').addEventListener(
            'click', this.handleLikeClick
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