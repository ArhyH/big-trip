import ItemView from '../view/item-view';
import ListView from '../view/list-view';
import FormView from '../view/form-view';
import SortView from '../view/sort-view';
import { render, replace } from '../framework/render';
import { generateSorts } from '../common/sort';
import { onEscKeydown } from '../common/utils';
import HintView from '../view/hint-view';
import { HintTexts } from '../common/consts';

export default class ContentPresenter {
  #contentNode = null;
  #pointsModel = null;
  #appState = null;
  #currentOpenForm = null;

  #list = new ListView();
  #listElement = this.#list.element;

  constructor({ contentNode, pointsModel, appState }) {
    this.#contentNode = contentNode;
    this.#pointsModel = pointsModel;
    this.#appState = appState;

    this.#appState.subscribe((state) => {
      this.#handleStateChange(state);
    });
  }

  init() {
    // Create
    render(
      new FormView({
        point: this.#pointsModel.newPoint,
        offers: this.#pointsModel.getOffersByType(
          this.#pointsModel.newPoint.type,
        ),
        destinations: this.#pointsModel.destinations,
      }),
      this.#listElement,
    );

    this.#handleStateChange(this.#appState.state);
  }

  #handleStateChange(state) {
    this.#contentNode.innerHTML = '';

    this.#renderContent(state);
  }

  #renderContent({ points, isLoading }) {
    if (isLoading) {
      render(new HintView({ message: HintTexts.loading }), this.#contentNode);
      return;
    }

    if (points.length === 0) {
      render(new HintView({ message: HintTexts.listEmpty }), this.#contentNode);
      return;
    }

    const sorts = generateSorts(this.#pointsModel.points);

    render(new SortView(sorts), this.#contentNode);
    render(this.#list, this.#contentNode);
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    let pointComponent = null;
    let formComponent = null;

    const escKeydownHandler = (evt) =>
      onEscKeydown(evt, () => {
        this.#closeForm({ pointComponent, formComponent, escKeydownHandler });
        document.removeEventListener('keydown', escKeydownHandler);
      });

    const offers = this.#pointsModel.getOffersById(point.type, point.offers);
    const destination = this.#pointsModel.getDestinationById(point.destination);

    pointComponent = new ItemView({
      point,
      offers: offers,
      destination: destination,
      onEditClick: () => {
        this.#openForm({ pointComponent, formComponent, escKeydownHandler });
      },
    });

    formComponent = new FormView({
      point: point,
      types: this.#pointsModel.types,
      offers: this.#pointsModel.getOffersByType(point.type),
      checkedOffers: offers,
      destinations: this.#pointsModel.destinations,
      details: destination,
      onFormSubmit: () => {
        this.#closeForm({ pointComponent, formComponent, escKeydownHandler });
      },
      onFormDecline: () => {
        this.#closeForm({ pointComponent, formComponent, escKeydownHandler });
      },
    });

    render(pointComponent, this.#listElement);
  }

  #closeCurrentForm() {
    if (this.#currentOpenForm) {
      this.#currentOpenForm.close();
      this.#currentOpenForm = null;
    }
  }

  #openForm({ formComponent, pointComponent, escKeydownHandler }) {
    this.#closeCurrentForm();

    replace(formComponent, pointComponent);
    document.addEventListener('keydown', escKeydownHandler);

    this.#currentOpenForm = {
      close: () => {
        replace(pointComponent, formComponent);
        document.removeEventListener('keydown', escKeydownHandler);
      },
    };
  }

  #closeForm({ pointComponent, formComponent, escKeydownHandler }) {
    replace(pointComponent, formComponent);
    document.removeEventListener('keydown', escKeydownHandler);
    this.#currentOpenForm = null;
  }
}
