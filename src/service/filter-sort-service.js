import { FilterPredicates, SortComparators } from '../common/sort';

export default class FilterSortService {
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
    return Object.entries(SortComparators).map(
      ([sortType, { isDisabled }]) => ({
        type: sortType,
        isDisabled: isDisabled || this.#pointsModel.points.length < 2,
        isChecked: sortType === this.#appState.currentSort,
      }),
    );
  }

  getFilteredPoints(points, filterType) {
    const predicate = FilterPredicates[filterType];

    if (!predicate) {
      return points;
    }

    return [...points].filter(predicate);
  }

  getSortedPoints(points, sortType) {
    const { comparator } = SortComparators[sortType];

    return comparator ? [...points].sort(comparator) : points;
  }
}
