export default class Section {

    constructor({items, renderer}, selector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    renderItems() {
        this._items instanceof Array ? 
          this._items.forEach((item) => {
              this._renderer(item);
          }) :
          this._renderer(this._items);
    }

    addItem(element) {
        this._container.prepend(element);
    }
}