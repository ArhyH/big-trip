import { NEW_POINT } from '../common/consts';
import { destinationsMock, items, offersList } from '../mock/data';

export default class PointsModel {
  #destinations = [];
  #offers = [];
  #newPoint = {};
  #points;

  init() {
    this.#destinations = destinationsMock;
    this.#offers = offersList;
    this.#newPoint = NEW_POINT;
    this.#points = new Map(items.map((item) => [item.id, item]));
  }

  get points() {
    return Array.from(this.#points.values());
  }

  get newPoint() {
    return this.#newPoint;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  getPointById(id) {
    return this.#points.get(id);
  }

  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type).offers;
  }

  getOffersById(type, targetIds) {
    const offersByType = this.getOffersByType(type);

    return offersByType.filter((offer) =>
      targetIds.find((id) => offer.id === id),
    );
  }

  getDestinationById(id) {
    return this.#destinations.find((dest) => dest.id === id);
  }

  hasPoint(point) {
    return this.#points.has(point.id);
  }

  addPoint(point) {
    this.#points.set(point.id, point);
  }

  removePoint(point) {
    if (this.#points.has(point.id)) {
      this.#points.delete(point.id);
    }
  }

  updatePoint(point) {
    if (!this.#points.has(point.id)) {
      return;
    }

    this.#points.set(point.id, point);
  }

  updatePointFields(point, fields) {
    const current = this.#points.get(point.id);

    if (!current) {
      return;
    }

    const updated = { ...current, ...fields };
    this.#points.set(point.id, updated);

    return updated;
  }

  toggleFavorite(point) {
    const current = this.#points.get(point.id);

    if (!current) {
      return;
    }

    const updated = { ...current, isFavorite: !current.isFavorite };
    this.#points.set(point.id, updated);

    return updated;
  }
}
