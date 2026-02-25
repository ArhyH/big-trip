import BaseComponent from '../common/base-component';

const getContent = (message) => `
  <p class="trip-events__msg">${message}</p>
`;

export default class HintView extends BaseComponent {
  constructor(message) {
    super();
    this.message = message;
  }

  getTemplate() {
    return getContent(this.message);
  }
}
