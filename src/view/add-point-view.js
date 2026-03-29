import AbstractView from '../framework/view/abstract-view';

const getButtonTemplate = (isDisabled) => {
  const disabled = isDisabled ? 'disabled' : '';

  return `
    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" ${disabled}>New event</button>
  `;
};

export default class AddPointView extends AbstractView {
  #isDisabled = false;
  #handleClick = null;

  constructor({ isDisabled, onClick }) {
    super();
    this.#isDisabled = isDisabled;
    this.#handleClick = onClick;

    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return getButtonTemplate(this.#isDisabled);
  }

  #clickHandler = () => {
    this.#handleClick();
  };
}
