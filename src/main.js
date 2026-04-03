import PointsModel from './model/points-model';
import ContentPresenter from './presenter/content-presenter';
import HeaderPresenter from './presenter/header-presenter';
import PointService from './service/point-service';
import AppState from './model/app-state';
import KeyboardManager from './manager/keyboard-manager';
import FilterSortService from './service/filter-sort-service';
import InfoService from './service/info-service';
import PointsApiService from './service/points-api-service';
import AdapterService from './service/adapter-service';
import { ApiSettings, AppStates } from './common/config';

const headerContentNode = document.querySelector('.trip-main');
const eventsNode = document.querySelector('.trip-events');

const apiService = new PointsApiService({
  endPoint: ApiSettings.URL,
  authorization: ApiSettings.AUTHORIZATION,
  adapterService: new AdapterService(),
});

const pointsModel = new PointsModel({ apiService });

const appState = new AppState();

const keyboardManager = new KeyboardManager();

appState.renderState = AppStates.IsLoading;

pointsModel.init().then(() => {
  appState.renderState = AppStates.IsReady;
});

const pointService = new PointService({ pointsModel, appState });
const filterSortService = new FilterSortService({ pointsModel, appState });
const infoService = new InfoService({ pointsModel, appState });

const contentPresenter = new ContentPresenter({
  contentNode: eventsNode,
  pointsModel,
  appState,
  pointService,
  filterSortService,
  keyboardManager,
});

const headerPresenter = new HeaderPresenter({
  contentNode: headerContentNode,
  pointsModel,
  appState,
  filterSortService,
  infoService,
  onAddPointClick: () => contentPresenter.openAddForm(),
});

headerPresenter.init();
contentPresenter.init();
