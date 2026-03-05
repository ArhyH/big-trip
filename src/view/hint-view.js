import AbstractView from '../framework/view/abstract-view';

const getContentTemplate = (message) => `
  <p class="trip-events__msg">${message}</p>
`;

export default class HintView extends AbstractView {
  #message = null;

  constructor({ message }) {
    super();
    this.#message = message;
  }

  get template() {
    return getContentTemplate(this.#message);
  }
}
