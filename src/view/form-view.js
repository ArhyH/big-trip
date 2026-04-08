import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { getContentTemplate } from './form-view-template';
import { DateTypes, FormModes } from '../common/config';

export default class FormView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleFormDecline = null;
  #handleTypeChange = null;
  #handleOfferSelect = null;
  #handleDestinationChange = null;
  #handleDateChange = null;
  #handlePriceChange = null;
  #handleFormClose = null;
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
      onDateChange,
      onPriceChange,
      onFormClose,
    } = callbacks;

    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormDecline = onFormDecline;
    this.#handleTypeChange = onTypeChange;
    this.#handleOfferSelect = onOfferSelect;
    this.#handleDestinationChange = onDestinationChange;
    this.#handleDateChange = onDateChange;
    this.#handlePriceChange = onPriceChange;
    this.#handleFormClose = onFormClose;

    this._setState(this.#parseDataToState(formData));
    this._restoreHandlers();
  }

  get template() {
    return getContentTemplate(this._state);
  }

  _restoreHandlers() {
    this.element
      .querySelector('.event--edit')
      .addEventListener('submit', this.#submitFormHandler);

    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#declineFormHandler);

    this.element
      .querySelector('.event__type-group')
      .addEventListener('click', this.#changeTypeHandler);

    this.element
      .querySelector('.event__available-offers')
      ?.addEventListener('click', this.#selectOfferHandler);

    this.element
      .querySelector('#event-destination-1')
      .addEventListener('change', this.#changeDestinationHandler);

    this.element
      .querySelector('#event-price-1')
      .addEventListener('input', this.#changePriceHandler);

    this.element
      .querySelector('.event__rollup-btn')
      ?.addEventListener('click', this.#closeFormHandler);

    this.#setFlatpickr();
  }

  removeElement() {
    super.removeElement();

    this.#flatpickrStart?.destroy();
    this.#flatpickrStart = null;

    this.#flatpickrEnd?.destroy();
    this.#flatpickrEnd = null;
  }

  patchState(state) {
    this._setState(state);
  }

  #setFlatpickr() {
    this.#flatpickrStart = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        // prettier-ignore
        'time_24hr': true,
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.point.dateFrom || null,
        onClose: (date) => this.#changeDateHandler(DateTypes.FROM, date),
      },
    );

    this.#flatpickrEnd = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        // prettier-ignore
        'time_24hr': true,
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.point.dateTo || null,
        minDate: this._state.point.dateFrom || null,
        onClose: (date) => this.#changeDateHandler(DateTypes.TO, date),
      },
    );
  }

  #parseDataToState(point) {
    return { ...point };
  }

  #parseStateToData(state) {
    return { point: state.point };
  }

  #submitFormHandler = (evt) => {
    evt.preventDefault();

    if (!this._state.point.dateFrom || !this._state.point.dateTo) {
      this.shake();
      return;
    }

    this.#handleFormSubmit(this.#parseStateToData(this._state));
  };

  #declineFormHandler = (evt) => {
    evt.preventDefault();

    if (this._state.mode === FormModes.UPDATE) {
      this.#handleFormDecline(this._state.point);
    } else {
      this.#handleFormDecline();
    }
  };

  #closeFormHandler = () => {
    this.#handleFormClose();
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
    if (dateType === DateTypes.FROM) {
      this.#flatpickrEnd.set('minDate', date);

      if (date > new Date(this._state.point.dateTo)) {
        this.#flatpickrEnd.setDate(date, false);
      }
    }

    this.#handleDateChange(dateType, date?.toISOString());
  };

  #changePriceHandler = (evt) => {
    this.#handlePriceChange(Number(evt.target.value));
  };
}
