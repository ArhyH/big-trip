import AbstractView from '../framework/view/abstract-view';

const getSortItemTemplate = ({ type, isChecked, isDisabled }) => {
  const disabledState = isDisabled ? 'disabled' : '';
  const checkedState = isChecked ? 'checked' : '';

  return `
    <div class="trip-sort__item  trip-sort__item--${type}">
      <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${checkedState} ${disabledState}>
      <label class="trip-sort__btn" for="sort-${type}">${type}</label>
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

  constructor(sorts) {
    super();
    this.#sorts = sorts;
  }

  get template() {
    return getContentTemplate(this.#sorts);
  }
}
