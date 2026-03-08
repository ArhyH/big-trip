import PointsModel from './model/points-model';
import ContentPresenter from './presenter/content-presenter';
import HeaderPresenter from './presenter/header-presenter';
import PointService from './services/point-service';
import AppState from './state/app-state';

const headerContentNode = document.querySelector('.trip-main');
const eventsNode = document.querySelector('.trip-events');

const pointsModel = new PointsModel();

const appState = new AppState();

appState.isLoading = true;

pointsModel.init();

appState.points = pointsModel.points;
appState.isLoading = false;

const pointService = new PointService(pointsModel);

const headerPresenter = new HeaderPresenter({
  contentNode: headerContentNode,
  pointsModel,
  appState,
});
const contentPresenter = new ContentPresenter({
  contentNode: eventsNode,
  pointsModel,
  appState,
  pointService,
});

headerPresenter.init();
contentPresenter.init();
