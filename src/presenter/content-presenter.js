import { render } from '../framework/render';
import { HintTexts, UpdateTypes } from '../common/consts';
import ListView from '../view/list-view';
import PointPresenter from './point-presenter';
import HintView from '../view/hint-view';
import SortPresenter from './sort-presenter';

export default class ContentPresenter {
  #contentNode = null;
  #pointsModel = null;
  #appState = null;
  #pointService = null;
  #sortService = null;
  #keyboardManager = null;

  #pointComponents = new Map();
  #sortedPoints = [];
  #currentOpenFormId = null;

  #list = new ListView();
  #listElement = this.#list.element;

  constructor(data) {
    const {
      contentNode,
      pointsModel,
      appState,
      pointService,
      sortService,
      keyboardManager,
    } = data;

    this.#contentNode = contentNode;
    this.#pointsModel = pointsModel;
    this.#appState = appState;
    this.#pointService = pointService;
    this.#keyboardManager = keyboardManager;
    this.#sortService = sortService;

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
    this.#renderContent(this.#pointsModel.points, state);
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
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      container: this.#listElement,
      callbacks: {
        onModeChange: () => {
          if (this.#currentOpenFormId) {
            this.#pointComponents.get(this.#currentOpenFormId).resetView();
          }
          this.#currentOpenFormId = point.id;
        },
        onFavoriteClick: () => {
          const updatedPoint = this.#pointsModel.toggleFavorite(point);

          if (updatedPoint) {
            this.#appState.notifyPointUpdated(updatedPoint);
          }
        },
      },
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
      sortService: this.#sortService,
    });

    sortPresenter.init();
    this.#sortedPoints = sortPresenter.getSortedPoints(
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
}
