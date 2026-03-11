import { FilterTypes, SortTypes, UpdateTypes } from '../common/consts';

export default class AppState {
  #isLoading = true;
  #currentFilter = FilterTypes.EVERYTHING;
  #currentSort = SortTypes.DAY;
  #observers = [];

  set isLoading(isLoading) {
    this.#isLoading = isLoading;
    this.#notify(UpdateTypes.FullChange);
  }

  set currentFilter(filter) {
    this.#currentFilter = filter;
    this.#notify(UpdateTypes.FullChange);
  }

  set currentSort(sort) {
    this.#currentSort = sort;
    this.#notify(UpdateTypes.FullChange);
  }

  get isLoading() {
    return this.#isLoading;
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
      currentFilter: this.#currentFilter,
      currentSort: this.#currentSort,
    };
  }

  subscribe(observer) {
    this.#observers.push(observer);
  }

  #notify(updateType = UpdateTypes.FullChange, restData = {}) {
    this.#observers.forEach((observer) =>
      observer(this.state, updateType, restData),
    );
  }

  notifyPointUpdated(point) {
    this.#notify(UpdateTypes.SinglePointUpdate, { pointId: point.id });
  }

  notifyPointsChanged() {
    this.#notify(UpdateTypes.FullChange);
  }
}
