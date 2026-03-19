import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { getContentTemplate } from './form-view-template';

export default class FormView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleFormDecline = null;
  #handleTypeChange = null;
  #handleOfferSelect = null;
  #handleDestinationChange = null;

  constructor({ formData, callbacks }) {
    super();

    const {
      onFormSubmit,
      onFormDecline,
      onTypeChange,
      onOfferSelect,
      onDestinationChange,
    } = callbacks;

    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormDecline = onFormDecline;
    this.#handleTypeChange = onTypeChange;
    this.#handleOfferSelect = onOfferSelect;
    this.#handleDestinationChange = onDestinationChange;

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

    this.element
      .querySelector('.event__type-group')
      .addEventListener('click', this.#changeTypeHandler);

    this.element
      .querySelector('.event__available-offers')
      .addEventListener('click', this.#selectOfferHandler);

    this.element
      .querySelector('#event-destination-1')
      .addEventListener('change', this.#changeDestinationHandler);

    this.element
      .querySelector('#destination-list-1')
      .addEventListener('click', this.#changeDestinationHandler);
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

  #changeTypeHandler = (evt) => {
    if (evt.target.tagName === 'LABEL') {
      evt.preventDefault();
      this.#handleTypeChange(evt.target.control.value);
    }
  };

  #selectOfferHandler = (evt) => {
    const label = evt.target.closest('.event__offer-label');
    if (label?.control) {
      evt.preventDefault();
      this.#handleOfferSelect(label.control.id);
    }
  };

  #changeDestinationHandler = (evt) => {
    if (evt.target.tagName === 'OPTION') {
      evt.preventDefault();
      this.element.querySelector('#event-destination-1').value =
        evt.target.value;
      this.#handleDestinationChange(evt.target.value);
    }

    if (evt.target.tagName === 'INPUT') {
      evt.preventDefault();
      this.#handleDestinationChange(evt.target.value);
    }
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
