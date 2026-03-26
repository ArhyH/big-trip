import PointsModel from './model/points-model';
import ContentPresenter from './presenter/content-presenter';
import HeaderPresenter from './presenter/header-presenter';
import PointService from './service/point-service';
import AppState from './model/app-state';
import KeyboardManager from './manager/keyboard-manager';
import SortService from './service/sort-service';
import { InfoService } from './service/info-service';

const headerContentNode = document.querySelector('.trip-main');
const eventsNode = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const appState = new AppState();

const keyboardManager = new KeyboardManager();

appState.isLoading = true;

pointsModel.init();

appState.isLoading = false;

const pointService = new PointService(pointsModel);
const sortService = new SortService({ pointsModel, appState });
const infoService = new InfoService(pointsModel);

const headerPresenter = new HeaderPresenter({
  contentNode: headerContentNode,
  pointsModel,
  appState,
  sortService,
  infoService,
});
const contentPresenter = new ContentPresenter({
  contentNode: eventsNode,
  pointsModel,
  appState,
  pointService,
  sortService,
  keyboardManager,
});

headerPresenter.init();
contentPresenter.init();
