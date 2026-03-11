import PointsModel from './model/points-model';
import ContentPresenter from './presenter/content-presenter';
import HeaderPresenter from './presenter/header-presenter';
import PointService from './service/point-service';
import AppState from './model/app-state';
import PointManager from './manager/point-manager';
import KeyboardManager from './manager/keyboard-manager';

const headerContentNode = document.querySelector('.trip-main');
const eventsNode = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const appState = new AppState();

const keyboardManager = new KeyboardManager();
const pointManager = new PointManager(keyboardManager);

appState.isLoading = true;

pointsModel.init();

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
  pointManager,
});

headerPresenter.init();
contentPresenter.init();
