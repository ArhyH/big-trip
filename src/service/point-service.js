import { FormModes } from '../common/app';

export default class PointService {
  #pointsModel = null;
  #appState = null;
  #formCallbacks = null;

  constructor({ pointsModel, appState }) {
    this.#pointsModel = pointsModel;
    this.#appState = appState;
  }

  getFormCallbacks({ point, getFormComponent, callbacks }) {
    this.#formCallbacks = null;
    this.#formCallbacks = this.#getFormCallbacks({
      point,
      getFormComponent,
      callbacks,
    });
    return this.#formCallbacks;
  }

  #getFormMode(point) {
    const isUpdateMode = this.#pointsModel.hasPoint(point);
    return isUpdateMode ? FormModes.Update : FormModes.Create;
  }

  #getFormCallbacks({ point, getFormComponent, callbacks }) {
    const mode = this.#getFormMode(point);

    const baseCallBacks = {
      onTypeChange: (newType) => {
        point = point.setType(newType);
        getFormComponent().updateElement(this.getFormData(point));
      },
      onOfferSelect: (offerId) => {
        point = point.toggleOffer(offerId);
        getFormComponent().updateElement(this.getFormData(point));
      },
      onDestinationChange: (destination) => {
        const id = this.getDestinationIdByName(destination);

        if (id === undefined) {
          return;
        }

        point = point.setDestination(id);
        getFormComponent().updateElement(this.getFormData(point));
      },
      onDateChange: (dateType, date) => {
        point = point.setDate(dateType, date);
      },
      onPriceChange: (price) => {
        point = point.setPrice(price);
      },
    };

    const createCallbacks = {
      onFormSubmit: () => {
        this.#pointsModel.addPoint(point);
        this.#appState.notifyPointsChanged();
        callbacks?.closeForm();
      },
      onFormDecline: () => {
        callbacks?.closeForm();
      },
    };

    const updateCallbacks = {
      onFormSubmit: () => {
        this.#pointsModel.updatePoint(point);
        this.#appState.notifyPointsChanged();
        callbacks?.closeForm();
      },
      onFormDecline: (id) => {
        this.#pointsModel.removePoint(id);
        this.#appState.notifyPointsChanged();
        this.#appState.currentOpenFormId = null;
        callbacks?.closeForm();
      },
      onFormClose: () => {
        callbacks?.closeForm();
      },
    };

    if (mode === FormModes.Update) {
      return { ...baseCallBacks, ...updateCallbacks };
    }

    return { ...baseCallBacks, ...createCallbacks };
  }

  getPointCallbacks({ point, onEditClick }) {
    return {
      onEditClick,
      onFavoriteClick: () => {
        const updated = this.#pointsModel.toggleFavorite(point);
        if (updated) {
          this.#appState.notifyPointsChanged(updated);
        }
      },
    };
  }

  getPointData(point) {
    return {
      point: point.data,
      offers: this.#pointsModel.getOffersById(point.type, point.offers),
      destination:
        this.#pointsModel.getDestinationById(point.destination) ?? {},
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
