import { remove, render, replace } from '../framework/render';

export default class PointPresenter {
  #pointService = null;
  #pointManager = null;
  #callbacks = null;
  #container = null;

  #pointComponent = null;
  #formComponent = null;
  #point = null;

  constructor({ container, callbacks, pointService, pointManager }) {
    this.#callbacks = callbacks;
    this.#pointService = pointService;
    this.#pointManager = pointManager;
    this.#container = container;
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
    remove(this.#pointComponent);
    remove(this.#formComponent);
  }

  #createComponents() {
    const pointData = this.#pointService.getPointData(this.#point);
    const formData = this.#pointService.getFormData(this.#point);

    const pointCallbacks = {
      onEditClick: () => {
        this.#pointManager.openForm({
          pointComponent: this.#pointComponent,
          formComponent: this.#formComponent,
        });
      },
      onFavoriteClick: this.#callbacks.onFavoriteClick,
    };

    const formCallbacks = {
      onFormSubmit: () => {
        this.#pointManager.closeCurrentForm();
      },
      onFormDecline: () => {
        this.#pointManager.closeCurrentForm();
      },
    };

    this.#pointComponent = this.#pointManager.createPointView(
      pointData,
      pointCallbacks,
    );
    this.#formComponent = this.#pointManager.createFormView(
      formData,
      formCallbacks,
    );
  }
}
