import { SortComparators } from '../common/sort';
import { render } from '../framework/render';
import SortView from '../view/sort-view';

export default class SortPresenter {
  #callbacks = null;
  #container = null;
  #sortService = null;

  constructor({ callbacks, container, sortService }) {
    this.#callbacks = callbacks;
    this.#container = container;
    this.#sortService = sortService;
  }

  init() {
    const sorts = this.#sortService.generateSorts();
    render(
      new SortView({
        sorts,
        onSortTypeChange: this.#callbacks?.onSortTypeChange,
      }),
      this.#container,
    );
  }

  getSortedPoints(points, sortType) {
    const comparator = SortComparators[sortType];

    if (!comparator) {
      return points;
    }

    return [...points].sort(comparator);
  }
}
