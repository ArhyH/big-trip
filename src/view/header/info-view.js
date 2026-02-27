import BaseComponent from '../../common/base-component';

const getContent = ({ title, description, cost }) => `
  <section class="trip-main__trip-info trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${title}</h1>
      <p class="trip-info__dates">${description}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>
  </section>
`;

export default class InfoView extends BaseComponent {
  constructor({ title, description, cost }) {
    super();
    this.title = title;
    this.description = description;
    this.cost = cost;
  }

  getTemplate() {
    return getContent({
      title: this.title,
      description: this.description,
      cost: this.cost,
    });
  }
}
