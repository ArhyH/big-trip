import AbstractView from '../framework/view/abstract-view';

const getButtonTemplate = (isLoading) => {
  const isDisabled = isLoading ? 'disabled' : '';

  return `
    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" ${isDisabled}>New event</button>
  `;
};

export default class AddPointView extends AbstractView {
  #isLoading = false;

  constructor({ isLoading }) {
    super();
    this.#isLoading = isLoading;
  }

  get template() {
    return getButtonTemplate(this.#isLoading);
  }
}
