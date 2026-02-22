import BaseComponent from '../../common/base-component';

const getContent = (name, price) => `
  <li class="event__offer">
    <span class="event__offer-title">${name}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>
`;

export default class OfferView extends BaseComponent {
  constructor({ name, price }) {
    super();
    this.name = name;
    this.price = price;
  }

  getTemplate() {
    return getContent(this.name, this.price);
  }
}
