import { FormModes } from '../common/consts';

export default class PointService {
  #pointsModel = null;

  constructor(pointsModel) {
    this.#pointsModel = pointsModel;
  }

  #getFormMode(point) {
    const isUpdateMode = this.#pointsModel.hasPoint(point);
    return isUpdateMode ? FormModes.Update : FormModes.Create;
  }

  getPointData(point) {
    return {
      point: point.data,
      offers: this.#pointsModel.getOffersById(point.type, point.offers),
      destination: this.#pointsModel.getDestinationById(point.destination),
    };
  }

  getFormData(point) {
    const allOffers = this.#pointsModel.getOffersByType(point.type);

    return {
      point: point.data,
      offers: allOffers,
      checkedOffers: allOffers.filter((offer) =>
        point.offers.includes(offer.id),
      ),
      destinations: this.#pointsModel.destinations,
      details: this.#pointsModel.getDestinationById(point.destination),
      mode: this.#getFormMode(point),
    };
  }

  getDestinationIdByName(name) {
    return this.#pointsModel.getDestinationIdByName(name);
  }
}
