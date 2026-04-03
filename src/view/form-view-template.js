import { FormModes } from '../common/config';
import { PointTypes } from '../common/point';
import { TimeFormates } from '../common/time';
import { getDateInFormat } from '../common/date';

const getEventTypeTemplate = (pointType, type) => {
  const isChecked = type === pointType ? 'checked' : '';

  return `
    <div class="event__type-item">
      <input id="${pointType}" class="event__type-input visually-hidden" type="radio" name="event-type" value="${pointType}" ${isChecked}>
      <label class="event__type-label  event__type-label--${pointType}" for="${pointType}">${pointType.charAt(0).toUpperCase() + pointType.slice(1)}</label>
    </div>`;
};

const getTypesBlockTemplate = ({ type }) => {
  const getPointTypes = () =>
    Object.values(PointTypes)
      .map((pointType) => getEventTypeTemplate(pointType, type))
      .join('');

  return `
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${getPointTypes()}
        </fieldset>
      </div>
    </div>`;
};

const getDestinationTemplate = ({ name }) =>
  `<option value="${name}"></option>`;

const getDestinationBlockTemplate = (point, destinations, details) => {
  const { type } = point;
  const { name = '' } = details;
  return `
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${destinations.map((destination) => getDestinationTemplate(destination)).join('')}
      </datalist>
    </div>`;
};

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

const getTimeTemplate = ({ dateFrom, dateTo }) => `
  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDateInFormat(dateFrom, TimeFormates.FULL)}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDateInFormat(dateTo, TimeFormates.FULL)}">
  </div>
`;

const getPriceTemplate = ({ basePrice }) => `
  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}">
  </div>
`;

const getCTAButtons = (isUpdateMode) => {
  const closeButton = `
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`;

  const deleteButton =
    '<button class="event__reset-btn" type="reset">Delete</button>';
  const cancelButton =
    '<button class="event__reset-btn" type="reset">Cancel</button>';

  return `
    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    ${isUpdateMode ? deleteButton : cancelButton}
    ${isUpdateMode ? closeButton : ''}`;
};

const getContentTemplate = (formData) => {
  const {
    point,
    offers,
    checkedOffers,
    details = {},
    destinations,
    mode,
  } = formData;
  const isUpdateMode = mode === FormModes.Update;

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${getTypesBlockTemplate(point)}
          ${getDestinationBlockTemplate(point, destinations, details)}
          ${getTimeTemplate(point)}
          ${getPriceTemplate(point)}
          ${getCTAButtons(isUpdateMode)}
        </header>
        <section class="event__details">
          ${getOffersListTemplate(offers, checkedOffers)}
          ${getDestinationInfoTemplate(details)}
        </section>
      </form>
    </li>`;
};

export { getContentTemplate };
