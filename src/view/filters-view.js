import AbstractView from '../framework/view/abstract-view';

const getFilterTemplate = ({ type, isChecked, isDisabled }) => {
  const checkedState = isChecked ? 'checked' : '';
  const disabledState = isDisabled ? 'disabled' : '';

  return `
    <div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${type}" ${checkedState} ${disabledState}>
      <label class="trip-filters__filter-label" for="filter-${type}" data-filter-type='${type}'>${type}</label>
    </div>
  `;
};

const getFiltersTemplate = (filters) =>
  filters.map((filter) => getFilterTemplate(filter)).join('');

const getContentTemplate = (filters) => {
  const filtersTemplate = getFiltersTemplate(filters);

  return `
    <form class="trip-filters" action="#" method="get">
      ${filtersTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
};

export default class FiltersView extends AbstractView {
  #filters = null;
  #handlerFilterTypeChange = null;

  constructor({ filters, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#handlerFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('click', this.#filterClickHandler);
  }

  get template() {
    return getContentTemplate(this.#filters);
  }

  #filterClickHandler = (evt) => {
    if (evt.target.tagName === 'LABEL' && !evt.target.control.disabled) {
      evt.preventDefault();
      this.#handlerFilterTypeChange(evt.target.dataset.filterType);
    }
  };
}
