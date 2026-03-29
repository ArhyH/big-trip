import { getDateInFormat } from '../common/date';
import { FilterPredicates } from '../common/sort';
import { TimeFormates } from '../common/time';
import { getArrayFromMap } from '../common/utils';

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
    const destinations = this.#filteredPoints.map((point) => point.destination);

    const names = new Map(
      destinations.map((id) => [
        id,
        this.#pointsModel.getDestinationById(id)?.name ?? 'Unknown',
      ]),
    );

    const title = getArrayFromMap(names).join(' &mdash; ');

    return title;
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
