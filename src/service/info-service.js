import { FORMAT_TIME } from '../common/consts';
import { getDateInFormat } from '../common/date';
import { getArrayFromMap } from '../common/utils';

export class InfoService {
  #pointsModel = null;

  constructor(pointsModel) {
    this.#pointsModel = pointsModel;
  }

  getDestinations() {
    const destinations = this.#pointsModel.filteredPoints.map(
      (point) => point.destination,
    );

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
    const dates = this.#pointsModel.filteredPoints.map(
      (point) => point.dateFrom,
    );

    const minDate = dates.reduce((min, date) => (date < min ? date : min));
    const maxDate = dates.reduce((max, date) => (date > max ? date : max));

    const formatted = [minDate, maxDate].map((date) =>
      getDateInFormat(date, FORMAT_TIME.DM),
    );

    if (formatted[0].slice(-3) === formatted[1].slice(-3)) {
      formatted[0] = formatted[0].slice(0, -3);
    }

    const description = formatted.join(' &mdash; ');

    return description;
  }

  getPrice() {
    const price = this.#pointsModel.filteredPoints.reduce(
      (total, point) => total + point.basePrice,
      0,
    );
    return price;
  }
}
