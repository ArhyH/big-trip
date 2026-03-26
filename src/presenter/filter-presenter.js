import { FilterPredicates } from '../common/sort';
import { remove, render, RenderPosition } from '../framework/render';
import FiltersView from '../view/filters-view';

export class FilterPresenter {
  #callbacks = null;
  #container = null;
  #filterSortService = null;
  #filterComponent = null;
  #filterPredicate = () => true;

  constructor({ callbacks, container, filterSortService }) {
    this.#callbacks = callbacks;
    this.#container = container;
    this.#filterSortService = filterSortService;
  }

  init() {
    const filters = this.#filterSortService.generateFilters();
    this.#filterComponent = new FiltersView({
      filters,
      onFilterTypeChange: this.#callbacks?.onFilterTypeChange,
    });

    render(this.#filterComponent, this.#container, RenderPosition.BEFOREEND);
  }

  update() {
    if (this.#filterComponent) {
      remove(this.#filterComponent);
    }
    this.init();
  }

  set filterPredicate(predicate) {
    this.#filterPredicate = FilterPredicates[predicate];
  }

  get filterPredicate() {
    return this.#filterPredicate;
  }
}
