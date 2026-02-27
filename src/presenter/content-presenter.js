import { render } from '../render';
import SortPresenter from './sort-presenter';
import ItemView from '../view/events/item-view';
import ListView from '../view/events/list-view';
import FormView from '../view/form/form-view';

export default class ContentPresenter {
  constructor({ contentNode, pointsModel }) {
    this.contentNode = contentNode;
    this.pointsModel = pointsModel;
  }

  list = new ListView();
  listElement = this.list.getElement();

  init() {
    this.currentPointId = 2;
    this.currentPoint = this.pointsModel.getPointById(this.currentPointId);
    this.points = [...this.pointsModel.getPoints()];

    this.sortPresenter = new SortPresenter(this.contentNode);
    this.sortPresenter.init();

    render(this.list, this.contentNode);

    // Edit
    render(
      new FormView({
        types: this.pointsModel.getTypes(),
        point: this.pointsModel.getPointById(this.currentPointId),
        offers: this.pointsModel.getOffersByType(this.currentPoint.type),
        checkedOffers: [
          ...this.pointsModel.getOffersById(
            this.currentPoint.type,
            this.currentPoint.offers,
          ),
        ],
        destinations: this.pointsModel.getDestinations(),
        details: this.pointsModel.getDestinationById(
          this.currentPoint.destination,
        ),
      }),
      this.listElement,
    );

    // Create
    render(
      new FormView({
        types: this.pointsModel.getTypes(),
        point: this.pointsModel.getNewPoint(),
        offers: this.pointsModel.getOffersByType(
          this.pointsModel.getNewPoint().type,
        ),
        destinations: this.pointsModel.getDestinations(),
      }),
      this.listElement,
    );

    this.points.forEach((point) => {
      render(
        new ItemView({
          point: point,
          offers: this.pointsModel.getOffersById(point.type, point.offers),
          destination: this.pointsModel.getDestinationById(point.destination),
        }),
        this.listElement,
      );
    });
  }
}
