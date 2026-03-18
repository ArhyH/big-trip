import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { getContentTemplate } from './form-view-template';

export default class FormView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleFormDecline = null;

  constructor({ formData, callbacks }) {
    super();

    const { onFormSubmit, onFormDecline } = callbacks;

    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormDecline = onFormDecline;

    this._setState(this.#parseDataToState(formData));
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element
      .querySelector('.event__save-btn')
      .addEventListener('click', this.#submitFormHandler);

    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#declineFormHandler);
  }

  get template() {
    return getContentTemplate(this._state);
  }

  #submitFormHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #declineFormHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormDecline();
  };

  #parseDataToState(point) {
    return { ...point };
  }

  #parseStateToData(state) {
    const data = { ...state };
    delete data.mode;

    return data;
  }
}
