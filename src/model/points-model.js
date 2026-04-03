import PointEntity from './point-entity';
import { getArrayFromMap } from '../common/utils';
import { AppStates } from '../common/config';

export default class PointsModel {
  #destinationsIdByName = new Map();
  #destinationsById = new Map();
  #offers = new Map();
  #points = new Map();
  #filterPredicate = () => true;
  #apiService = null;
  #appState = null;

  constructor({ apiService, appState }) {
    this.#apiService = apiService;
    this.#appState = appState;
  }

  init() {
    this.#setData();
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

  async addPoint(point) {
    const entity =
      point instanceof PointEntity ? point : new PointEntity(point);

    const response = await this.#apiService.addPoint(entity.data);
    const newEntity = new PointEntity(response);
    this.#points.set(newEntity.id, newEntity);
  }

  async removePoint(point) {
    if (this.#points.has(point.id)) {
      await this.#apiService.removePoint(point);
      this.#points.delete(point.id);
    }
  }

  async updatePoint(point) {
    const entity =
      point instanceof PointEntity ? point : new PointEntity(point);

    if (!this.#points.has(entity.id)) {
      return;
    }

    const response = await this.#apiService.updatePoint(entity.data);
    const newEntity = new PointEntity(response);
    this.#points.set(newEntity.id, newEntity);
  }

  async toggleFavorite(point) {
    const current = this.#points.get(point.id);

    if (!current) {
      return;
    }

    const updated = current.toggleFavorite();
    const response = await this.#apiService.updatePoint(updated.data);
    const entity = new PointEntity(response);
    this.#points.set(entity.id, entity);
    return entity;
  }

  async #setDestinations() {
    const destinations = await this.#apiService.destinations;

    this.#destinationsIdByName = new Map(
      destinations.map((destination) => [destination.name, destination.id]),
    );
    this.#destinationsById = new Map(
      destinations.map((destination) => [destination.id, destination]),
    );
  }

  async #setOffers() {
    const offers = await this.#apiService.offers;

    this.#offers = new Map(offers.map((offer) => [offer.type, offer.offers]));
  }

  async #setPoints() {
    const points = await this.#apiService.points;

    this.#points = new Map(
      points.map((item) => {
        const point = new PointEntity(item);
        return [point.id, point];
      }),
    );
  }

  async #setData() {
    try {
      await this.#setDestinations();
      await this.#setOffers();
      await this.#setPoints();
    } catch {
      this.#appState.renderState = AppStates.IsError;
      return;
    }
    this.#appState.renderState = AppStates.IsReady;
  }
}
