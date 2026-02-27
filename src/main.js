import PointsModel from './model/points-model';
import ContentPresenter from './presenter/content-presenter';
import HeaderPresenter from './presenter/header-presenter';

const headerContentNode = document.querySelector('.trip-main');
const eventsNode = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
pointsModel.init();

const headerPresenter = new HeaderPresenter(headerContentNode);
const contentPresenter = new ContentPresenter({
  contentNode: eventsNode,
  pointsModel,
});

headerPresenter.init();
contentPresenter.init();
