import { FilterTypes, SortTypes } from '../common/consts';

export default class AppState {
  #isLoading = true;
  #points = [];
  #currentFilter = FilterTypes.EVERYTHING;
  #currentSort = SortTypes.DAY;
  #observers = [];

  set isLoading(isLoading) {
    this.#isLoading = isLoading;
    this.#notify();
  }

  set points(points) {
    this.#points = points;
    this.#notify();
  }

  set currentFilter(filter) {
    this.#currentFilter = filter;
    this.#notify();
  }

  set currentSort(sort) {
    this.#currentSort = sort;
    this.#notify();
  }

  get isLoading() {
    return this.#isLoading;
  }

  get points() {
    return this.#points;
  }

  get currentFilter() {
    return this.#currentFilter;
  }

  get currentSort() {
    return this.#currentSort;
  }

  get state() {
    return {
      isLoading: this.#isLoading,
      points: [...this.#points],
      currentFilter: this.#currentFilter,
      currentSort: this.#currentSort,
    };
  }

  subscribe(observer) {
    this.#observers.push(observer);
  }

  #notify() {
    this.#observers.forEach((observer) => observer(this.state));
  }
}
