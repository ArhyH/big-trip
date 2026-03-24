import { remove, render, replace } from '../framework/render';
import FormView from '../view/form-view';
import PointView from '../view/point-view';

export default class PointPresenter {
  #pointService = null;
  #callbacks = null;
  #container = null;
  #keyboardManager = null;

  #pointComponent = null;
  #formComponent = null;
  #point = null;
  #isOpenForm = false;

  constructor({ container, callbacks, pointService, keyboardManager }) {
    this.#callbacks = callbacks;
    this.#pointService = pointService;
    this.#container = container;
    this.#keyboardManager = keyboardManager;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevFormComponent = this.#formComponent;

    this.#createComponents();

    if (prevPointComponent === null || prevFormComponent === null) {
      render(this.#pointComponent, this.#container);
      return;
    }

    if (this.#container.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#container.contains(prevFormComponent.element)) {
      replace(this.#formComponent, prevFormComponent);
    }

    remove(prevPointComponent);
    remove(prevFormComponent);
  }

  destroy() {
    this.resetView();
    remove(this.#pointComponent);
    remove(this.#formComponent);
  }

  #createComponents() {
    const pointData = this.#pointService.getPointData(this.#point);
    const pointCallbacks = this.#getPointCallbacks();

    const formData = this.#pointService.getFormData(this.#point);
    const formCallbacks = this.#getFormCallbacks();

    this.#pointComponent = new PointView({
      pointData,
      callbacks: pointCallbacks,
    });

    this.#formComponent = new FormView({
      formData,
      callbacks: formCallbacks,
    });
  }

  #openForm() {
    replace(this.#formComponent, this.#pointComponent);

    this.#keyboardManager.addEscHandler(this.#pointComponent.id, () => {
      this.#closeForm();
    });

    this.#isOpenForm = true;
  }

  #closeForm() {
    if (!this.#isOpenForm) {
      return;
    }

    replace(this.#pointComponent, this.#formComponent);
    this.#keyboardManager.removeEscHandler(this.#pointComponent.id);
    this.#isOpenForm = false;
  }

  #getPointCallbacks() {
    return {
      onEditClick: () => {
        this.#callbacks?.onModeChange();
        this.#openForm();
      },
      onFavoriteClick: this.#callbacks.onFavoriteClick,
    };
  }

  #getFormCallbacks() {
    return {
      onFormSubmit: () => {
        this.#closeForm();
      },
      onFormDecline: () => {
        this.#closeForm();
      },
      onTypeChange: (newType) => {
        this.#point = this.#point.setType(newType);
        const newFormData = this.#pointService.getFormData(this.#point);
        this.#formComponent.updateElement(newFormData);
      },
      onOfferSelect: (id) => {
        this.#point = this.#point.toggleOffer(id);
        const newFormData = this.#pointService.getFormData(this.#point);
        this.#formComponent.updateElement(newFormData);
      },
      onDestinationChange: (destination) => {
        const destinationId =
          this.#pointService.getDestinationIdByName(destination);

        if (destinationId === undefined) {
          return;
        }
        this.#point = this.#point.setDestination(destinationId);
        const newFormData = this.#pointService.getFormData(this.#point);
        this.#formComponent.updateElement(newFormData);
      },
    };
  }

  resetView() {
    this.#closeForm();
  }
}
