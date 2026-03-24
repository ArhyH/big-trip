import PointEntity from './point-entity';
import { destinationsMock, items, offersList } from '../mock/data';
import { getArrayFromMap } from '../common/utils';

export default class PointsModel {
  #destinationsIdByName = new Map();
  #destinationsById = new Map();
  #offers = new Map();
  #points = new Map();

  init() {
    this.#setDestinations(destinationsMock);
    this.#setOffers(offersList);
    this.#setPoints(items);
  }

  get points() {
    return getArrayFromMap(this.#points);
  }

  get newPoint() {
    return new PointEntity();
  }

  get offers() {
    return getArrayFromMap(this.#offers);
  }

  get destinations() {
    return getArrayFromMap(this.#destinationsById);
  }

  getPointById(id) {
    return this.#points.get(id);
  }

  getOffersByType(type) {
    return this.#offers.get(type) ?? [];
  }

  getOffersById(type, targetIds) {
    const offersByType = this.getOffersByType(type);

    return offersByType.filter((offer) => targetIds.includes(offer.id));
  }

  getDestinationById(id) {
    return this.#destinationsById.get(id);
  }

  getDestinationIdByName(name) {
    return this.#destinationsIdByName.get(name);
  }

  hasPoint(point) {
    return this.#points.has(point.id);
  }

  addPoint(point) {
    const entity =
      point instanceof PointEntity ? point : new PointEntity(point);
    this.#points.set(entity.id, entity);
  }

  removePoint(point) {
    if (this.#points.has(point.id)) {
      this.#points.delete(point.id);
    }
  }

  updatePoint(point) {
    const entity =
      point instanceof PointEntity ? point : new PointEntity(point);

    if (!this.#points.has(entity.id)) {
      return;
    }

    this.#points.set(entity.id, entity);
  }

  updatePointFields(point, fields) {
    const current = this.#points.get(point.id);

    if (!current) {
      return;
    }

    const updated = current.updateData(fields);
    this.#points.set(point.id, updated);

    return updated;
  }

  toggleFavorite(point) {
    const current = this.#points.get(point.id);

    if (!current) {
      return;
    }

    const updated = current.toggleFavorite();
    this.#points.set(point.id, updated);

    return updated;
  }

  #setDestinations(destinations) {
    this.#destinationsIdByName = new Map(
      destinations.map((destination) => [destination.name, destination.id]),
    );
    this.#destinationsById = new Map(
      destinations.map((destination) => [destination.id, destination]),
    );
  }

  #setOffers(offers) {
    this.#offers = new Map(offers.map((offer) => [offer.type, offer.offers]));
  }

  #setPoints(points) {
    this.#points = new Map(
      points.map((item) => {
        const point = new PointEntity(item);
        return [point.id, point];
      }),
    );
  }
}
