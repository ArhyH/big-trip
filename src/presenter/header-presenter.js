import { remove, render, RenderPosition } from '../framework/render';
import AddPointView from '../view/add-point-view';
import FiltersView from '../view/filters-view';
import { InfoPresenter } from './info-presenter';

export default class HeaderPresenter {
  #contentNode = null;
  #pointsModel = null;
  #appState = null;
  #sortService = null;
  #infoService = null;
  #infoPresenter = null;

  #addPointComponent = null;

  constructor(data) {
    const { contentNode, pointsModel, appState, sortService, infoService } =
      data;

    this.#contentNode = contentNode;
    this.#pointsModel = pointsModel;
    this.#appState = appState;
    this.#sortService = sortService;
    this.#infoService = infoService;

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
    this.#renderInfo(state);
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

  #renderInfo(state) {
    this.#infoPresenter?.destroy();
    this.#infoPresenter = null;

    if (this.#pointsModel.points.length === 0 || state.isLoading) {
      return;
    }

    this.#infoPresenter = new InfoPresenter({
      infoService: this.#infoService,
      contentNode: this.#contentNode,
    });

    this.#infoPresenter.init();
  }
}
