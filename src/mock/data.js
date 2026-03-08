import { POINT_TYPES } from '../common/consts';
import { getRandomArrayElement } from '../common/utils';

const offersList = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Order Uber',
        price: 20,
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Order Uber',
        price: 20,
      },
    ],
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Order Uber',
        price: 20,
      },
    ],
  },
  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'Order Uber',
        price: 20,
      },
    ],
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'Rent a car',
        price: 200,
      },
      {
        id: 2,
        title: 'Rent a car',
        price: 80,
      },
    ],
  },
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Add luggage',
        price: 50,
      },
      {
        id: 2,
        title: 'Switch to comfort class',
        price: 100,
      },
      {
        id: 3,
        title: 'Add meal',
        price: 15,
      },
      {
        id: 4,
        title: 'Choose seats',
        price: 5,
      },
      {
        id: 5,
        title: 'Travel by train',
        price: 40,
      },
    ],
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 1,
        title: 'Order Uber',
        price: 20,
      },
    ],
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 1,
        title: 'Order Uber',
        price: 20,
      },
    ],
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 1,
        title: 'Order Uber',
        price: 20,
      },
    ],
  },
];

const items = [
  {
    id: 1,
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 1,
    isFavorite: false,
    offers: [1, 2],
    type: POINT_TYPES[5],
  },
  {
    id: 2,
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 2,
    isFavorite: false,
    offers: [1, 2],
    type: getRandomArrayElement(POINT_TYPES),
  },
  {
    id: 3,
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 3,
    isFavorite: false,
    offers: [1],
    type: getRandomArrayElement(POINT_TYPES),
  },
  {
    id: 4,
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 3,
    isFavorite: true,
    offers: [1],
    type: getRandomArrayElement(POINT_TYPES),
  },
];

const destinations = [
  {
    id: 1,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, enim!',
    name: 'Chamonix',
    pictures: [
      {
        src: 'img/photos/5.jpg',
        description: 'Lorem ipsum dolor sit.',
      },
      {
        src: 'img/photos/3.jpg',
        description: 'Lorem ipsum dolor sit.',
      },
    ],
  },
  {
    id: 2,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, enim!',
    name: 'Geneva',
    pictures: [
      {
        src: 'img/photos/5.jpg',
        description: 'Lorem ipsum dolor sit.',
      },
      {
        src: 'img/photos/3.jpg',
        description: 'Lorem ipsum dolor sit.',
      },
    ],
  },
  {
    id: 3,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, enim!',
    name: 'Amsterdam',
    pictures: [
      {
        src: 'img/photos/5.jpg',
        description: 'Lorem ipsum dolor sit.',
      },
      {
        src: 'img/photos/3.jpg',
        description: 'Lorem ipsum dolor sit.',
      },
    ],
  },
];

export { items, offersList, destinations };
