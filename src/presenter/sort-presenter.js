import { SORTS } from '../common/consts';
import { render } from '../render';

import SortView from '../view/sort/sort-view';
import SortItemView from '../view/sort/sort-item-view';

export default class SortPresenter {
  constructor(contentNode) {
    this.contentNode = contentNode;
  }

  sort = new SortView();

  init() {
    render(this.sort, this.contentNode);

    SORTS.forEach((sort) => {
      render(new SortItemView(sort), this.sort.getElement());
    });
  }
}
