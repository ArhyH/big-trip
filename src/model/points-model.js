import { NEW_POINT, POINT_TYPES } from '../common/consts';
import { destinations, items, offersList } from '../mock/data';

export default class PointsModel {
  constructor() {
    this.types = [];
    this.destinations = [];
    this.offers = [];
    this.points = [];
    this.newPoint = {};
  }

  init() {
    this.types = POINT_TYPES;
    this.destinations = destinations;
    this.offers = offersList;
    this.points = items;
    this.newPoint = NEW_POINT;
  }

  getPoints() {
    return this.points;
  }

  getPointById(id) {
    return this.points.find((point) => point.id === id);
  }

  getNewPoint() {
    return this.newPoint;
  }

  getTypes() {
    return this.types;
  }

  getOffers() {
    return this.offers;
  }

  getOffersByType(type) {
    return this.offers.find((offer) => offer.type === type).offers;
  }

  getOffersById(type, targetIds) {
    const offersByType = this.getOffersByType(type);

    return offersByType.filter((offer) =>
      targetIds.find((id) => offer.id === id),
    );
  }

  getDestinations() {
    return this.destinations;
  }

  getDestinationById(id) {
    return this.getDestinations().find((dest) => dest.id === id);
  }
}
