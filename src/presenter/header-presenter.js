import { render, RenderPosition } from '../render';
import FiltersView from '../view/header/filters-view';
import InfoView from '../view/header/info-view';

export default class HeaderPresenter {
  constructor(contentNode) {
    this.contentNode = contentNode;
  }

  init() {
    render(
      new InfoView({
        title: 'Amsterdam &mdash; Chamonix &mdash; Geneva',
        description: '18&nbsp;&mdash;&nbsp;20 Mar',
        cost: '1230',
      }),
      this.contentNode,
      RenderPosition.AFTERBEGIN,
    );

    render(new FiltersView(), this.contentNode);
  }
}
