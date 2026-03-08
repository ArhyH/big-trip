import { generateFilters } from '../common/sort';
import { remove, render, RenderPosition } from '../framework/render';
import AddPointView from '../view/add-point-view';
import FiltersView from '../view/filters-view';
import InfoView from '../view/info-view';

export default class HeaderPresenter {
  #contentNode = null;
  #pointsModel = null;
  #appState = null;

  #addPointComponent = null;
  #infoComponent = null;

  constructor({ contentNode, pointsModel, appState }) {
    this.#contentNode = contentNode;
    this.#pointsModel = pointsModel;
    this.#appState = appState;

    this.#appState.subscribe((state) => {
      this.#handleStateChange(state);
    });
  }

  init() {
    this.#renderFilters();
    this.#renderAddButton();
    this.#handleStateChange(this.#appState.state);
  }

  #handleStateChange(state) {
    this.#updateAddButton(state);
    this.#updateHeader(state);
  }

  #renderFilters() {
    const filtersNode = this.#contentNode.querySelector(
      '.trip-controls__filters',
    );
    const filters = generateFilters(this.#pointsModel.points);

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

  #updateHeader({ points, isLoading }) {
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
