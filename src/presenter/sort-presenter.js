import { SortComparators } from '../common/sort';
import { render } from '../framework/render';
import SortView from '../view/sort-view';

export default class SortPresenter {
  #callbacks = null;
  #container = null;
  #filterSortService = null;

  constructor({ callbacks, container, filterSortService }) {
    this.#callbacks = callbacks;
    this.#container = container;
    this.#filterSortService = filterSortService;
  }

  init() {
    const sorts = this.#filterSortService.generateSorts();

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
