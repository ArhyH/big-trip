import { FormModes, EntityStates } from '../common/config';
import { getEncodedData } from '../common/utils';

export default class PointService {
  #pointsModel = null;
  #appState = null;
  #formCallbacks = null;
  #uiBlocker = null;

  constructor({ pointsModel, appState, uiBlocker }) {
    this.#pointsModel = pointsModel;
    this.#appState = appState;
    this.#uiBlocker = uiBlocker;
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

  #setState(formComponent, state) {
    let isDisabled = false;
    let isDeleting = false;
    let isSaving = false;

    if (state === EntityStates.isDeleting) {
      isDisabled = true;
      isDeleting = true;
    }

    if (state === EntityStates.isSaving) {
      isDisabled = true;
      isSaving = true;
    }

    formComponent.updateElement({
      isDisabled,
      isDeleting,
      isSaving,
    });
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
        const id = this.getDestinationIdByName(getEncodedData(destination));

        if (id === undefined) {
          return;
        }

        point = point.setDestination(id);
        getFormComponent().updateElement(this.getFormData(point));
      },
      onDateChange: (dateType, date) => {
        point = point.setDate(dateType, date);
        getFormComponent().patchState({ point: point.data });
      },
      onPriceChange: (price) => {
        point = point.setPrice(price);
        getFormComponent().patchState({ point: point.data });
      },
    };

    const createCallbacks = {
      onFormSubmit: async (formData) => {
        this.#uiBlocker.block();
        this.#setState(getFormComponent(), EntityStates.isSaving);
        try {
          await this.#pointsModel.addPoint(formData.point);
          this.#appState.notifyPointsChanged();
          callbacks?.closeForm();
        } catch {
          this.#setState(getFormComponent(), EntityStates.isReady);
          getFormComponent().shake();
        } finally {
          this.#uiBlocker.unblock();
        }
      },
      onFormDecline: () => {
        callbacks?.closeForm();
      },
    };

    const updateCallbacks = {
      onFormSubmit: async () => {
        this.#uiBlocker.block();
        this.#setState(getFormComponent(), EntityStates.isSaving);
        try {
          await this.#pointsModel.updatePoint(point);
          this.#appState.notifyPointsChanged();
          callbacks?.closeForm();
        } catch {
          this.#setState(getFormComponent(), EntityStates.isReady);
          getFormComponent().shake();
        } finally {
          this.#uiBlocker.unblock();
        }
      },
      onFormDecline: async (id) => {
        this.#uiBlocker.block();
        this.#setState(getFormComponent(), EntityStates.isDeleting);
        try {
          await this.#pointsModel.removePoint(id);
          this.#appState.notifyPointsChanged();
          this.#appState.currentOpenFormId = null;
          callbacks?.closeForm();
        } catch {
          this.#setState(getFormComponent(), EntityStates.isReady);
          getFormComponent().shake();
        } finally {
          this.#uiBlocker.unblock();
        }
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

  getPointCallbacks({ point, getPointComponent, onEditClick }) {
    return {
      onEditClick,
      onFavoriteClick: async () => {
        try {
          const updated = await this.#pointsModel.toggleFavorite(point);
          if (updated) {
            this.#appState.notifyPointsChanged(updated);
          }
        } catch {
          getPointComponent().shake();
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
      state: this.#appState.renderState,
    };
  }

  getDestinationIdByName(name) {
    return this.#pointsModel.getDestinationIdByName(name);
  }
}
