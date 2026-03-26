import { remove, render, RenderPosition } from '../framework/render';
import InfoView from '../view/info-view';

export class InfoPresenter {
  #infoService = null;
  #contentNode = null;
  #infoComponent = null;

  constructor({ infoService, contentNode }) {
    this.#infoService = infoService;
    this.#contentNode = contentNode;
  }

  init() {
    this.#infoComponent = new InfoView({
      destinations: this.#infoService.getDestinations(),
      dates: this.#infoService.getDates(),
      price: this.#infoService.getPrice(),
    });

    render(this.#infoComponent, this.#contentNode, RenderPosition.AFTERBEGIN);
  }

  destroy() {
    if (this.#infoComponent) {
      remove(this.#infoComponent);
      this.#infoComponent = null;
    }
  }
}
