import PointsModel from './model/points-model';
import ContentPresenter from './presenter/content-presenter';
import HeaderPresenter from './presenter/header-presenter';
import PointService from './service/point-service';
import AppState from './model/app-state';
import KeyboardManager from './manager/keyboard-manager';
import FilterSortService from './service/filter-sort-service';
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
const filterSortService = new FilterSortService({ pointsModel, appState });
const infoService = new InfoService(pointsModel);

const headerPresenter = new HeaderPresenter({
  contentNode: headerContentNode,
  pointsModel,
  appState,
  filterSortService,
  infoService,
});
const contentPresenter = new ContentPresenter({
  contentNode: eventsNode,
  pointsModel,
  appState,
  pointService,
  filterSortService,
  keyboardManager,
});

headerPresenter.init();
contentPresenter.init();
