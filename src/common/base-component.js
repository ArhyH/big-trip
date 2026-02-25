import { createElement } from '../render';

export default class BaseComponent {
  getTemplate() {
    throw new Error('Метод getTemplate() не определён');
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
