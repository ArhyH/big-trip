import { AppStates } from '../common/app';
import { FilterPredicates } from '../common/sort';
import { remove, render, RenderPosition } from '../framework/render';
import AddPointView from '../view/add-point-view';
import FilterPresenter from './filter-presenter';
import InfoPresenter from './info-presenter';

export default class HeaderPresenter {
  #contentNode = null;
  #pointsModel = null;
  #appState = null;
  #filterSortService = null;
  #infoService = null;
  #infoPresenter = null;
  #filterPresenter = null;
  #handleAddPointClick = null;

  #addPointComponent = null;

  constructor(data) {
    const {
      contentNode,
      pointsModel,
      appState,
      filterSortService,
      infoService,
      onAddPointClick,
    } = data;

    this.#contentNode = contentNode;
    this.#pointsModel = pointsModel;
    this.#appState = appState;
    this.#filterSortService = filterSortService;
    this.#infoService = infoService;
    this.#handleAddPointClick = onAddPointClick;

    this.#appState.subscribe((state, updateType, restData) => {
      this.#handleStateChange(state, updateType, restData);
    });
  }

  init() {
    this.#renderFilters();
    this.#handleStateChange(this.#appState.state);
  }

  #handleStateChange(state) {
    const predicate = FilterPredicates[state.currentFilter];
    this.#pointsModel.setFilterPredicate(predicate);

    this.#renderAddButton(state.renderState);
    this.#renderInfo(state.renderState);
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

  #renderAddButton(renderState) {
    const isDisabled = renderState !== AppStates.IsReady;

    remove(this.#addPointComponent);

    this.#addPointComponent = new AddPointView({
      isDisabled,
      onClick: this.#handleAddPointClick,
    });

    render(
      this.#addPointComponent,
      this.#contentNode,
      RenderPosition.BEFOREEND,
    );
  }

  #renderInfo(renderState) {
    this.#infoPresenter?.destroy();
    this.#infoPresenter = null;

    if (
      this.#pointsModel.filteredPoints.length === 0 ||
      renderState !== AppStates.IsReady
    ) {
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

    this.#appState.currentFilter = filterType;
  }
}
