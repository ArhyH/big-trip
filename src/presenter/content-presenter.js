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
  #pointManager = null;
  #pointComponents = new Map();
  #sortedPoints = [];

  #list = new ListView();
  #listElement = this.#list.element;

  constructor(data) {
    const { contentNode, pointsModel, appState, pointService, pointManager } =
      data;

    this.#contentNode = contentNode;
    this.#pointsModel = pointsModel;
    this.#appState = appState;
    this.#pointService = pointService;
    this.#pointManager = pointManager;

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
        onFavoriteClick: () => {
          point.isFavorite = !point.isFavorite;
          this.#pointsModel.updatePoint(point);
          this.#appState.notifyPointUpdated(point);
        },
      },
      pointService: this.#pointService,
      pointManager: this.#pointManager,
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
    });

    sortPresenter.init(points, this.#appState.currentSort);
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
