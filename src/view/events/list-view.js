import BaseComponent from '../../common/base-component';

const getContent = () => '<ul class="trip-events__list"><ul>';

export default class ListView extends BaseComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return getContent();
  }
}
