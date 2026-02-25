import { items } from '../mock/items';
import { render } from '../render';
import SortPresenter from './sort-presenter';
import ItemView from '../view/events/item-view';
import ListView from '../view/events/list-view';
import FormView from '../view/form/form-view';

export default class ContentPresenter {
  constructor(contentNode) {
    this.contentNode = contentNode;
  }

  list = new ListView();
  listElement = this.list.getElement();

  init() {
    this.sortPresenter = new SortPresenter(this.contentNode);

    this.sortPresenter.init();

    render(this.list, this.contentNode);
    render(new FormView(), this.listElement);

    items.forEach((item) => {
      render(new ItemView(item), this.listElement);
    });
  }
}
