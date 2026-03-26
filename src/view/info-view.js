import AbstractView from '../framework/view/abstract-view';

const getContentTemplate = ({ destinations, dates, price }) => `
  <section class="trip-main__trip-info trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${destinations}</h1>
      <p class="trip-info__dates">${dates}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
    </p>
  </section>
`;

export default class InfoView extends AbstractView {
  #destinations = null;
  #dates = null;
  #price = null;

  constructor({ destinations, dates, price }) {
    super();
    this.#destinations = destinations;
    this.#dates = dates;
    this.#price = price;
  }

  get template() {
    return getContentTemplate({
      destinations: this.#destinations,
      dates: this.#dates,
      price: this.#price,
    });
  }
}
