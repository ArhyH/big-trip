import { getDateInFormat } from '../common/date';
import { FilterPredicates } from '../common/sort';
import { TimeFormates } from '../common/time';

export default class InfoService {
  #pointsModel = null;
  #appState = null;

  constructor({ pointsModel, appState }) {
    this.#pointsModel = pointsModel;
    this.#appState = appState;
  }

  get #filteredPoints() {
    const predicate = FilterPredicates[this.#appState.currentFilter];
    return predicate
      ? this.#pointsModel.points.filter(predicate)
      : this.#pointsModel.points;
  }

  getDestinations() {
    const names = [
      ...new Set(
        this.#filteredPoints.map(
          ({ destination }) =>
            this.#pointsModel.getDestinationById(destination)?.name ??
            'Unknown',
        ),
      ),
    ];

    if (names.length <= 3) {
      return names.join(' &mdash; ');
    }

    return `${names.at(0)} &mdash; ... &mdash; ${names.at(-1)}`;
  }

  getDates() {
    const dates = this.#filteredPoints.map((point) => point.dateFrom);

    const minDate = dates.reduce((min, date) => (date < min ? date : min));
    const maxDate = dates.reduce((max, date) => (date > max ? date : max));

    const formatted = [minDate, maxDate].map((date) =>
      getDateInFormat(date, TimeFormates.DM),
    );

    if (formatted[0].slice(-3) === formatted[1].slice(-3)) {
      formatted[0] = formatted[0].slice(0, -3);
    }

    const description = formatted.join(' &mdash; ');

    return description;
  }

  getPrice() {
    const pointsPrice = this.#filteredPoints.reduce(
      (total, point) => total + point.basePrice,
      0,
    );

    const offers = this.#pointsModel.points.flatMap((point) =>
      this.#pointsModel.getOffersById(point.type, point.offers),
    );

    const offersPrice = offers.reduce((total, offer) => total + offer.price, 0);

    const totalPrice = pointsPrice + offersPrice;

    return totalPrice;
  }
}
