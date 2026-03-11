import { generateSorts, sort } from '../common/sort';
import { render } from '../framework/render';
import SortView from '../view/sort-view';

export default class SortPresenter {
  #callbacks = null;
  #container = null;

  constructor({ callbacks, container }) {
    this.#callbacks = callbacks;
    this.#container = container;
  }

  init(points, currentSort) {
    const sorts = generateSorts(points, currentSort);
    render(
      new SortView({
        sorts,
        onSortTypeChange: this.#callbacks?.onSortTypeChange,
      }),
      this.#container,
    );
  }

  getSortedPoints(points, sortType) {
    const comparator = sort[sortType];

    if (!comparator) {
      return points;
    }

    return [...points].sort(comparator);
  }
}
