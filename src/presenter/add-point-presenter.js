import { remove, render, RenderPosition } from '../framework/render';
import FormView from '../view/form-view';

export default class AddPointPresenter {
  #container = null;
  #pointService = null;
  #pointsModel = null;
  #keyboardManager = null;

  #formComponent = null;
  #point = null;

  constructor(data) {
    const { container, pointService, pointsModel, keyboardManager } = data;

    this.#container = container;
    this.#pointService = pointService;
    this.#pointsModel = pointsModel;
    this.#keyboardManager = keyboardManager;
  }

  init() {
    this.#point = this.#pointsModel.newPoint;

    const formData = this.#pointService.getFormData(this.#point);
    this.#formComponent = new FormView({
      formData,
      callbacks: this.#pointService.getFormCallbacks({
        point: this.#point,
        getFormComponent: () => this.#formComponent,
        callbacks: {
          closeForm: () => this.#closeForm(),
        },
      }),
    });

    render(this.#formComponent, this.#container, RenderPosition.AFTERBEGIN);
    this.#keyboardManager.addEscHandler('new-point', () => this.#closeForm());
  }

  #closeForm() {
    if (!this.#formComponent) {
      return;
    }

    remove(this.#formComponent);
    this.#formComponent = null;
    this.#keyboardManager.removeEscHandler('new-point');
  }

  resetView() {
    this.#closeForm();
  }
}
