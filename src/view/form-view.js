import { FORMAT_TIME, POINT_TYPES } from '../common/consts';
import { getDateInFormat } from '../common/date';
import AbstractView from '../framework/view/abstract-view';

const getEventTypeTemplate = (type, curentType) => {
  const isChecked = type === curentType ? 'checked' : '';

  return `
    <div class="event__type-item">
      <input id="${type}" class="event__type-input visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked}>
      <label class="event__type-label  event__type-label--${type}" for="${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</label>
    </div>`;
};

const getDestinationTemplate = (destination) =>
  `<option value="${destination}"></option>`;

const getOfferTemplate = (offer, checkedOffers) => {
  const { id, price, title } = offer;
  const isChecked = checkedOffers?.map((item) => item.id).includes(id)
    ? 'checked'
    : '';

  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox visually-hidden" id="${id}" type="checkbox" name="${id}" ${isChecked}>
      <label class="event__offer-label" for="${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>
  `;
};

const getOffersListTemplate = (offers, checkedOffers) => {
  if (offers.length > 0) {
    return `
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offers.map((offer) => getOfferTemplate(offer, checkedOffers)).join('')}
        </div>
      </section>
    `;
  }

  return '';
};

const getPictureTemplate = ({ src, description }) => `
  <img class="event__photo" src="${src}" alt="${description}">
`;

const getDestinationInfoTemplate = ({ pictures, description }) => {
  if (!pictures && !description) {
    return '';
  }

  return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${pictures?.map((picture) => getPictureTemplate({ src: picture.src, description: picture.description })).join('')}
        </div>
      </div>
    </section>
  `;
};

const getContentTemplate = ({
  point,
  destinations,
  offers,
  checkedOffers,
  details = {},
}) => {
  const { type, dateFrom, dateTo, basePrice } = point;
  const { name = '' } = details;

  const typesTemplate = POINT_TYPES.map((item) =>
    getEventTypeTemplate(item, point.type),
  ).join('');

  const destinationsDemplate = destinations
    .map((destination) => getDestinationTemplate(destination))
    .join('');

  const offersListTemplate = getOffersListTemplate(offers, checkedOffers);

  const destinationInfoTemplate = getDestinationInfoTemplate(details);

  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${typesTemplate}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            Flight
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinationsDemplate}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDateInFormat(dateFrom, FORMAT_TIME.FULL)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDateInFormat(dateTo, FORMAT_TIME.FULL)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        ${offersListTemplate}
        ${destinationInfoTemplate}
      </section>
    </form>
  </li>
`;
};

export default class FormView extends AbstractView {
  #destinations = null;
  #point = null;
  #offers = null;
  #checkedOffers = null;
  #details = null;
  #handleFormSubmit = null;
  #handleFormDecline = null;

  constructor({ formData, onFormSubmit, onFormDecline }) {
    super();

    const { point, offers, checkedOffers, details, destinations } = formData;
    this.#point = point;
    this.#offers = offers;
    this.#checkedOffers = checkedOffers;
    this.#destinations = destinations;
    this.#details = details;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormDecline = onFormDecline;

    this.element
      .querySelector('.event__save-btn')
      .addEventListener('click', this.#submitFormHandler);

    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#declineFormHandler);
  }

  get template() {
    return getContentTemplate({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      checkedOffers: this.#checkedOffers,
      details: this.#details,
    });
  }

  #submitFormHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #declineFormHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormDecline();
  };
}
