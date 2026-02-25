import ContentPresenter from './presenter/content-presenter';
import HeaderPresenter from './presenter/header-presenter';

const headerContentNode = document.querySelector('.trip-main');
const eventsNode = document.querySelector('.trip-events');

const headerPresenter = new HeaderPresenter(headerContentNode);
const contentPresenter = new ContentPresenter(eventsNode);

headerPresenter.init();
contentPresenter.init();
