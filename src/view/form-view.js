import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { DateTypes } from '../common/consts';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { getContentTemplate } from './form-view-template';

export default class FormView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleFormDecline = null;
  #handleTypeChange = null;
  #handleOfferSelect = null;
  #handleDestinationChange = null;
  #flatpickrStart = null;
  #flatpickrEnd = null;

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

    this.#setFlatpickr();
  }

  get template() {
    return getContentTemplate(this._state);
  }

  removeElement() {
    super.removeElement();

    this.#flatpickrStart?.destroy();
    this.#flatpickrStart = null;

    this.#flatpickrEnd?.destroy();
    this.#flatpickrEnd = null;
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
    evt.preventDefault();
    this.#handleDestinationChange(evt.target.value);
  };

  #changeDateHandler = (dateType, [date]) => {
    const updatedPoint = { ...this._state.point, [dateType]: date };

    if (dateType === DateTypes.dateFrom) {
      this.#flatpickrEnd.set('minDate', date);

      if (date > new Date(this._state.point.dateTo)) {
        updatedPoint.dateTo = date;
        this.#flatpickrEnd.setDate(date, false);
      }
    }

    this._setState({ ...this._state, point: updatedPoint });
  };

  #setFlatpickr() {
    this.#flatpickrStart = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.point.dateFrom,
        onChange: (date) => this.#changeDateHandler(DateTypes.dateFrom, date),
      },
    );

    this.#flatpickrEnd = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.point.dateTo,
        minDate: this._state.point.dateFrom,
        onChange: (date) => this.#changeDateHandler(DateTypes.dateTo, date),
      },
    );
  }

  #parseDataToState(point) {
    return { ...point };
  }

  #parseStateToData(state) {
    const data = { ...state };
    delete data.mode;

    return data;
  }
}
