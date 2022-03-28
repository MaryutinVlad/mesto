export default class Section {

    constructor(renderer, selector) {
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    renderItems(items) {
          items.then(cards => cards.forEach(this._renderer))
            .catch(err => console.log(err));
    }

    addItem(element) {
        this._container.prepend(element);
    }
}