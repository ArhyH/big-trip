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
      point,
      offers: this.#pointsModel.getOffersById(point.type, point.offers),
      destination: this.#pointsModel.getDestinationById(point.destination),
    };
  }

  getFormData(point) {
    return {
      point,
      offers: this.#pointsModel.getOffersByType(point.type),
      checkedOffers: this.#pointsModel.getOffersById(point.type, point.offers),
      destinations: this.#pointsModel.destinations,
      details: this.#pointsModel.getDestinationById(point.destination),
      mode: this.#getFormMode(point),
    };
  }
}
