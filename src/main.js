import ItemModel from './model/item-model';
import ContentPresenter from './presenter/content-presenter';
import HeaderPresenter from './presenter/header-presenter';

const headerContentNode = document.querySelector('.trip-main');
const eventsNode = document.querySelector('.trip-events');

const itemModel = new ItemModel();

const headerPresenter = new HeaderPresenter(headerContentNode);
const contentPresenter = new ContentPresenter({
  contentNode: eventsNode,
  itemModel,
});

headerPresenter.init();
contentPresenter.init();
