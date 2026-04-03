import PointEntity from './point-entity';
import { getArrayFromMap } from '../common/utils';

export default class PointsModel {
  #destinationsIdByName = new Map();
  #destinationsById = new Map();
  #offers = new Map();
  #points = new Map();
  #filterPredicate = () => true;
  #apiService = null;

  constructor({ apiService }) {
    this.#apiService = apiService;
  }

  async init() {
    await this.#setDestinations();
    await this.#setOffers();
    await this.#setPoints();
  }

  get points() {
    return getArrayFromMap(this.#points);
  }

  get filteredPoints() {
    return this.points.filter(this.#filterPredicate);
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

  setFilterPredicate(predicate) {
    this.#filterPredicate = predicate;
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

  async updatePoint(point) {
    const entity =
      point instanceof PointEntity ? point : new PointEntity(point);

    if (!this.#points.has(entity.id)) {
      return;
    }

    try {
      const response = await this.#apiService.updatePoint(entity.data);
      this.#points.set(entity.id, new PointEntity(response));
    } catch (error) {
      // prettier-ignore
      throw new Error('Can\'t update point');
    }
  }

  async toggleFavorite(point) {
    const current = this.#points.get(point.id);

    if (!current) {
      return;
    }

    try {
      const updated = current.toggleFavorite();
      const response = await this.#apiService.updatePoint(updated.data);
      const entity = new PointEntity(response);
      this.#points.set(point.id, entity);
      return entity;
    } catch (error) {
      // prettier-ignore
      throw new Error('Can\'t update point');
    }
  }

  async #setDestinations() {
    try {
      const destinations = await this.#apiService.destinations;

      this.#destinationsIdByName = new Map(
        destinations.map((destination) => [destination.name, destination.id]),
      );
      this.#destinationsById = new Map(
        destinations.map((destination) => [destination.id, destination]),
      );
    } catch (error) {
      this.#destinationsIdByName = new Map();
      this.#destinationsById = new Map();
    }
  }

  async #setOffers() {
    try {
      const offers = await this.#apiService.offers;

      this.#offers = new Map(offers.map((offer) => [offer.type, offer.offers]));
    } catch (error) {
      this.#offers = new Map();
    }
  }

  async #setPoints() {
    try {
      const points = await this.#apiService.points;

      this.#points = new Map(
        points.map((item) => {
          const point = new PointEntity(item);
          return [point.id, point];
        }),
      );
    } catch (error) {
      this.#points = new Map();
    }
  }
}
