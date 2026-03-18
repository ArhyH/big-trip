import { FORMAT_TIME } from '../common/consts';
import { getDateInFormat, getDiffInTime } from '../common/date';

const getPointInfoTemplate = (point, destination) => {
  const { dateFrom, type } = point;
  const { name } = destination;
  return `
    <time class="event__date" datetime="${dateFrom}">${getDateInFormat(dateFrom, FORMAT_TIME.MD)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${name}</h3>`;
};

const getOfferTemplate = ({ title, price }) => `
  <li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>
`;

const getScheduleTemplate = ({ dateFrom, dateTo }) => `
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${dateFrom}">${getDateInFormat(dateFrom, FORMAT_TIME.H)}</time>
      &mdash;
      <time class="event__end-time" datetime="${dateTo}">${getDateInFormat(dateTo, FORMAT_TIME.H)}</time>
    </p>
    <p class="event__duration">${getDiffInTime(dateFrom, dateTo)}</p>
  </div>
`;

const getPriceTemplate = ({ basePrice }) => `
  <p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
  </p>`;

const getCTATemplate = ({ isFavorite }) => {
  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';

  return `
    <button class="event__favorite-btn ${favoriteClassName}" type="button">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </button>

  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
  `;
};

const getContentTemplate = (data) => {
  const { point, offers, destination } = data;

  return `
    <li class="trip-events__item">
      <div class="event">
        ${getPointInfoTemplate(point, destination)}

        ${getScheduleTemplate(point)}

        ${getPriceTemplate(point)}

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offers.map((offer) => getOfferTemplate(offer)).join('')}
        </ul>

        ${getCTATemplate(point)}
      </div>
    </li>
  `;
};

export { getContentTemplate };
