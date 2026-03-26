import { remove, render, RenderPosition } from '../framework/render';
import AddPointView from '../view/add-point-view';
import { FilterPresenter } from './filter-presenter';
import { InfoPresenter } from './info-presenter';

export default class HeaderPresenter {
  #contentNode = null;
  #pointsModel = null;
  #appState = null;
  #filterSortService = null;
  #infoService = null;
  #infoPresenter = null;
  #filterPresenter = null;

  #addPointComponent = null;

  constructor(data) {
    const {
      contentNode,
      pointsModel,
      appState,
      filterSortService,
      infoService,
    } = data;

    this.#contentNode = contentNode;
    this.#pointsModel = pointsModel;
    this.#appState = appState;
    this.#filterSortService = filterSortService;
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
    this.#updateAddButton(state.isLoading);
    this.#renderInfo(state.isLoading);
    this.#filterPresenter?.update();
  }

  #renderFilters() {
    const filtersNode = this.#contentNode.querySelector(
      '.trip-controls__filters',
    );

    this.#filterPresenter = new FilterPresenter({
      callbacks: {
        onFilterTypeChange: (filterType) => {
          this.#handlerFilterTypeChange(filterType);
        },
      },
      container: filtersNode,
      filterSortService: this.#filterSortService,
    });

    this.#filterPresenter.init();
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

  #renderInfo(isLoading) {
    this.#infoPresenter?.destroy();
    this.#infoPresenter = null;

    if (this.#pointsModel.filteredPoints.length === 0 || isLoading) {
      return;
    }

    this.#infoPresenter = new InfoPresenter({
      infoService: this.#infoService,
      contentNode: this.#contentNode,
    });

    this.#infoPresenter.init();
  }

  #handlerFilterTypeChange(filterType) {
    if (filterType === this.#appState.currentFilter) {
      return;
    }

    this.#filterPresenter.filterPredicate = filterType;
    this.#pointsModel.setFilterPredicate(this.#filterPresenter.filterPredicate);
    this.#appState.currentFilter = filterType;
  }
}
