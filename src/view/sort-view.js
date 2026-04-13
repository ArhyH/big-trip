import AbstractView from '../framework/view/abstract-view';

const getSortItemTemplate = ({ type, isChecked, isDisabled }) => {
  const disabledState = isDisabled ? 'disabled' : '';
  const checkedState = isChecked ? 'checked' : '';

  return `
    <div class="trip-sort__item  trip-sort__item--${type}">
      <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${checkedState} ${disabledState}>
      <label class="trip-sort__btn" data-sort-type='${type}' for="sort-${type}">${type}</label>
    </div>
  `;
};

const getSortsTemplate = (sorts) =>
  sorts.map((sort) => getSortItemTemplate(sort)).join('');

const getContentTemplate = (sorts) => {
  const sortsTemplate = getSortsTemplate(sorts);

  return `<form class="trip-events__trip-sort trip-sort" action="#" method="get">
      ${sortsTemplate}
    </form>`;
};

export default class SortView extends AbstractView {
  #sorts = null;
  #handleSortTypeChange = null;

  constructor({ sorts, onSortTypeChange }) {
    super();
    this.#sorts = sorts;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortClickHandler);
  }

  get template() {
    return getContentTemplate(this.#sorts);
  }

  #sortClickHandler = (evt) => {
    if (evt.target.tagName === 'LABEL' && !evt.target.control.disabled) {
      evt.preventDefault();
      this.#handleSortTypeChange(evt.target.dataset.sortType);
    }
  };
}
