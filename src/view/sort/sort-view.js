import BaseComponent from '../../common/base-component';

const getContent = () =>
  '<form class="trip-events__trip-sort  trip-sort" action="#" method="get"></form>';

export default class SortView extends BaseComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return getContent();
  }
}
