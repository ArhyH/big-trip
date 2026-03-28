import { render } from '../framework/render';
import { HintTexts, UpdateTypes } from '../common/consts';
import ListView from '../view/list-view';
import PointPresenter from './point-presenter';
import HintView from '../view/hint-view';
import SortPresenter from './sort-presenter';
import AddPointPresenter from './add-point-presenter';

export default class ContentPresenter {
  #contentNode = null;
  #pointsModel = null;
  #appState = null;
  #pointService = null;
  #filterSortService = null;
  #keyboardManager = null;

  #pointComponents = new Map();
  #sortedPoints = [];
  #addPointPresenter = null;

  #list = new ListView();
  #listElement = this.#list.element;

  constructor(data) {
    const {
      contentNode,
      pointsModel,
      appState,
      pointService,
      filterSortService,
      keyboardManager,
    } = data;

    this.#contentNode = contentNode;
    this.#pointsModel = pointsModel;
    this.#appState = appState;
    this.#pointService = pointService;
    this.#keyboardManager = keyboardManager;
    this.#filterSortService = filterSortService;

    this.#appState.subscribe((state, updateType, restData) => {
      this.#handleStateChange(state, updateType, restData);
    });
  }

  init() {
    this.#handleStateChange(this.#appState.state);
  }

  #handleStateChange(state, updateType, restData) {
    if (updateType === UpdateTypes.SinglePointUpdate) {
      const { pointId } = restData;
      this.#updatePoint(pointId);
      return;
    }

    this.#clearPoints();
    this.#contentNode.innerHTML = '';

    const filtered = this.#filterSortService.getFilteredPoints(
      this.#pointsModel.points,
      state.currentFilter,
    );

    this.#renderContent(filtered, state);
  }

  #renderContent(points, state) {
    const { isLoading } = state;

    if (isLoading) {
      this.#renderHint(HintTexts.loading, this.#contentNode);
      return;
    }

    if (points.length === 0) {
      this.#renderHint(HintTexts.listEmpty, this.#contentNode);
      return;
    }

    this.#renderSorts(points);
    this.#renderPoints();
  }

  #renderPoints() {
    render(this.#list, this.#contentNode);
    this.#sortedPoints.forEach((point) => this.#renderPoint(point));
  }

  #clearPoints() {
    this.#pointComponents.forEach((presenter) => presenter.destroy());
    this.#pointComponents.clear();
    this.#listElement.innerHTML = '';
    this.#addPointPresenter = null;
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      container: this.#listElement,
      callbacks: this.#pointService.getPointCallbacks({
        point,
        onEditClick: () => {
          if (this.#appState.currentOpenFormId) {
            this.#pointComponents
              .get(this.#appState.currentOpenFormId)
              ?.resetView();
          }
          this.#addPointPresenter?.resetView();
          this.#appState.currentOpenFormId = point.id;
        },
      }),
      pointService: this.#pointService,
      keyboardManager: this.#keyboardManager,
    });

    pointPresenter.init(point);
    this.#pointComponents.set(point.id, pointPresenter);
  }

  #updatePoint(pointId) {
    const pointPresenter = this.#pointComponents.get(pointId);
    const updatedPoint = this.#pointsModel.getPointById(pointId);

    pointPresenter.init(updatedPoint);
  }

  #renderSorts(points) {
    const sortPresenter = new SortPresenter({
      callbacks: {
        onSortTypeChange: (sortType) => {
          this.#handleSortTypeChange(sortType);
        },
      },
      container: this.#contentNode,
      filterSortService: this.#filterSortService,
    });

    sortPresenter.init();

    this.#sortedPoints = this.#filterSortService.getSortedPoints(
      points,
      this.#appState.currentSort,
    );
  }

  #handleSortTypeChange(sortType) {
    if (sortType === this.#appState.currentSort) {
      return;
    }

    this.#appState.currentSort = sortType;
  }

  #renderHint(message, container) {
    container.innerHTML = '';
    render(new HintView({ message }), container);
  }

  openAddForm() {
    this.#appState.resetFilterAndSort();

    if (this.#appState.currentOpenFormId) {
      this.#pointComponents.get(this.#appState.currentOpenFormId)?.resetView();
      this.#appState.currentOpenFormId = null;
    }

    if (!this.#contentNode.contains(this.#listElement)) {
      this.#contentNode.innerHTML = '';
      render(this.#listElement, this.#contentNode);
    }

    this.#addPointPresenter?.resetView();

    this.#addPointPresenter = new AddPointPresenter({
      container: this.#listElement,
      pointService: this.#pointService,
      pointsModel: this.#pointsModel,
      keyboardManager: this.#keyboardManager,
    });

    this.#addPointPresenter.init();
  }
}
