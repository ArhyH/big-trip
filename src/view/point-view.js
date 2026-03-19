import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { getContentTemplate } from './point-view-template';

export default class PointView extends AbstractStatefulView {
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({ pointData, callbacks }) {
    super();
    const { onEditClick, onFavoriteClick } = callbacks;

    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this._setState(pointData);
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);

    this.element
      .querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return getContentTemplate(this._state);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
