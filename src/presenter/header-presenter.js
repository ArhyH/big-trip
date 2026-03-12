import { remove, render, RenderPosition } from '../framework/render';
import AddPointView from '../view/add-point-view';
import FiltersView from '../view/filters-view';
import InfoView from '../view/info-view';

export default class HeaderPresenter {
  #contentNode = null;
  #pointsModel = null;
  #appState = null;
  #sortService = null;

  #addPointComponent = null;
  #infoComponent = null;

  constructor({ contentNode, pointsModel, appState, sortService }) {
    this.#contentNode = contentNode;
    this.#pointsModel = pointsModel;
    this.#appState = appState;
    this.#sortService = sortService;

    this.#appState.subscribe((state, updateType, restData) => {
      this.#handleStateChange(state, updateType, restData);
    });
  }

  init() {
    this.#renderFilters();
    this.#renderAddButton();
    this.#handleStateChange(this.#appState.state);
  }

  #handleStateChange(state) {
    this.#updateAddButton(state);
    this.#updateHeader(this.#pointsModel.points, state);
  }

  #renderFilters() {
    const filtersNode = this.#contentNode.querySelector(
      '.trip-controls__filters',
    );

    const filters = this.#sortService.generateFilters();

    render(new FiltersView({ filters: filters }), filtersNode);
  }

  #renderAddButton() {
    this.#addPointComponent = new AddPointView({ isLoading: false });

    render(
      this.#addPointComponent,
      this.#contentNode,
      RenderPosition.BEFOREEND,
    );
  }

  #updateAddButton(isLoading) {
    if (this.#addPointComponent) {
      remove(this.#addPointComponent);
    }

    this.#addPointComponent = new AddPointView(isLoading);

    render(
      this.#addPointComponent,
      this.#contentNode,
      RenderPosition.BEFOREEND,
    );
  }

  #updateHeader(points, state) {
    const { isLoading } = state;

    if (this.#infoComponent) {
      remove(this.#infoComponent);
      this.#infoComponent = null;
    }

    if (points.length === 0 || isLoading) {
      return;
    }

    this.#infoComponent = new InfoView({
      title: 'Amsterdam &mdash; Chamonix &mdash; Geneva',
      description: '18&nbsp;&mdash;&nbsp;20 Mar',
      cost: '1230',
    });

    render(this.#infoComponent, this.#contentNode, RenderPosition.AFTERBEGIN);
  }
}
