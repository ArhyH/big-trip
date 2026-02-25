import { render } from '../render';
import SortPresenter from './sort-presenter';
import ItemView from '../view/events/item-view';
import ListView from '../view/events/list-view';
import FormView from '../view/form/form-view';

const getItemTitle = ({ type, destination }) => {
  return `${type} ${destination}`.replace(/\b\w/g, (char) =>
    char.toUpperCase(),
  );
};

export default class ContentPresenter {
  constructor({ contentNode, itemModel, formModel }) {
    this.contentNode = contentNode;
    this.itemModel = itemModel;
    this.formModel = formModel;
  }

  list = new ListView();
  listElement = this.list.getElement();

  init() {
    this.data = this.formModel.getFormDataById();
    this.items = [...this.itemModel.getItems()];

    this.sortPresenter = new SortPresenter(this.contentNode);

    this.sortPresenter.init();

    render(this.list, this.contentNode);
    render(new FormView(this.data), this.listElement);

    this.items.forEach((item) => {
      item.title = getItemTitle({
        type: item.type,
        destination: item.destination,
      });
      render(new ItemView(item), this.listElement);
    });
  }
}
