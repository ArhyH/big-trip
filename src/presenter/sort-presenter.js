import { SORTS } from '../common/consts';
import { render } from '../render';
import SortView from '../view/sort';

export default class SortPresenter {
  constructor(contentNode) {
    this.contentNode = contentNode;
  }

  init() {
    render(new SortView(SORTS), this.contentNode);
  }
}
