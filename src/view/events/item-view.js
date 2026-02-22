import BaseComponent from '../../common/base-component';

const getContent = (date, icon, title, startTime, endTime, duration, price) => `
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${date}</time>

      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${icon}.png" alt="Event type icon">
      </div>

      <h3 class="event__title">${title}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${startTime}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${endTime}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers"></ul>

      <button class="event__favorite-btn event__favorite-btn--active" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
`;

export default class ItemView extends BaseComponent {
  constructor({
    date,
    icon,
    title,
    startTime,
    endTime,
    duration,
    price,
    events,
  }) {
    super();
    this.date = date;
    this.icon = icon;
    this.title = title;
    this.startTime = startTime;
    this.endTime = endTime;
    this.duration = duration;
    this.price = price;
    this.events = events; // МБ дойдет, как через эту пропсу обыгрывать
  }

  getTemplate() {
    return getContent(
      this.date,
      this.icon,
      this.title,
      this.startTime,
      this.endTime,
      this.duration,
      this.price,
    );
  }
}
