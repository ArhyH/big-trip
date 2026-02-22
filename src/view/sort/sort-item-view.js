import BaseComponent from '../../common/base-component';

const getContent = (name, disabled) => `
  <div class="trip-sort__item  trip-sort__item--${name}">
    <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" checked ${disabled ? 'disabled' : ''}>
    <label class="trip-sort__btn" for="sort-${name}">${name}</label>
  </div>
`;

export default class SortItemView extends BaseComponent {
  constructor({ name, disabled }) {
    super();
    this.name = name;
    this.disabled = disabled;
  }

  getTemplate() {
    return getContent(this.name, this.disabled);
  }
}
