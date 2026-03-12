import { FilterPredicates, SortComparators } from '../common/sort';

export default class SortService {
  #pointsModel = null;
  #appState = null;

  constructor({ pointsModel, appState }) {
    this.#pointsModel = pointsModel;
    this.#appState = appState;
  }

  generateFilters() {
    return Object.entries(FilterPredicates).map(
      ([filterType, filterPredicate]) => ({
        type: filterType,
        isDisabled:
          this.#pointsModel.points.filter(filterPredicate).length === 0,
        isChecked: filterType === this.#appState.currentFilter,
      }),
    );
  }

  generateSorts() {
    return Object.entries(SortComparators).map(([sortType]) => ({
      type: sortType,
      isDisabled: this.#pointsModel.points.length < 2,
      isChecked: sortType === this.#appState.currentSort,
    }));
  }
}
