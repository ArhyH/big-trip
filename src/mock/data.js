import { POINT_TYPES } from '../common/consts';
import { getRandomArrayElement } from '../common/utils';

const offersList = [
  {
    type: 'taxi',
    offers: [
      {
        id: '1',
        title: 'Taxi offer 1',
        price: 20,
      },
      {
        id: '2',
        title: 'Taxi offer 2',
        price: 20,
      },
      {
        id: '3',
        title: 'Taxi offer 3',
        price: 20,
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        id: '1',
        title: 'Bus offer 1',
        price: 20,
      },
      {
        id: '2',
        title: 'Bus offer 2',
        price: 20,
      },
      {
        id: '3',
        title: 'Bus offer 3',
        price: 20,
      },
    ],
  },
  {
    type: 'train',
    offers: [
      {
        id: '1',
        title: 'Train offer 1',
        price: 20,
      },
      {
        id: '2',
        title: 'Train offer 2',
        price: 20,
      },
      {
        id: '3',
        title: 'Train offer 3',
        price: 20,
      },
    ],
  },
  {
    type: 'ship',
    offers: [
      {
        id: '1',
        title: 'Ship offer 2',
        price: 20,
      },
      {
        id: '2',
        title: 'Ship offer 2',
        price: 20,
      },
      {
        id: '3',
        title: 'Ship offer 3',
        price: 20,
      },
    ],
  },
  {
    type: 'drive',
    offers: [
      {
        id: '1',
        title: 'Rent a car',
        price: 200,
      },
      {
        id: '2',
        title: 'Drive offer 2',
        price: 80,
      },
      {
        id: '3',
        title: 'Drive offer 3',
        price: 20,
      },
    ],
  },
  {
    type: 'flight',
    offers: [
      {
        id: '1',
        title: 'Add luggage',
        price: 50,
      },
      {
        id: '2',
        title: 'Switch to comfort class',
        price: 100,
      },
      {
        id: '3',
        title: 'Add meal',
        price: 15,
      },
      {
        id: '4',
        title: 'Choose seats',
        price: 5,
      },
      {
        id: '5',
        title: 'Travel by train',
        price: 40,
      },
    ],
  },
  {
    type: 'check-in',
    offers: [
      {
        id: '1',
        title: 'Check-in offer 1',
        price: 20,
      },
      {
        id: '2',
        title: 'Check-in offer 2',
        price: 20,
      },
    ],
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: '1',
        title: 'Sightseeing offer 1',
        price: 20,
      },
      {
        id: '2',
        title: 'Sightseeing-in offer 2',
        price: 20,
      },
    ],
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: '1',
        title: 'Restaurant offer 1',
        price: 20,
      },
      {
        id: '2',
        title: 'Restaurant offer 2',
        price: 20,
      },
      {
        id: '3',
        title: 'Restaurant offer 3',
        price: 20,
      },
    ],
  },
];

const items = [
  {
    id: 1,
    basePrice: 1100,
    dateFrom: '2026-01-12T08:00:00.000Z',
    dateTo: '2026-01-12T10:00:00.000Z', // 2 часа
    destination: 1,
    isFavorite: false,
    offers: ['1', '2'],
    type: POINT_TYPES[5],
  },
  {
    id: 2,
    basePrice: 1100,
    dateFrom: '2026-02-20T14:15:00.000Z',
    dateTo: '2026-02-21T16:45:00.000Z', // ~1 день 2.5 часа
    destination: 2,
    isFavorite: false,
    offers: ['1', '2'],
    type: getRandomArrayElement(POINT_TYPES),
  },
  {
    id: 3,
    basePrice: 900,
    dateFrom: '2026-04-03T09:00:00.000Z',
    dateTo: '2026-04-03T11:30:00.000Z', // / 2.5 часа
    destination: 3,
    isFavorite: false,
    offers: ['1'],
    type: getRandomArrayElement(POINT_TYPES),
  },
  {
    id: 4,
    basePrice: 1200,
    dateFrom: '2026-06-18T07:20:00.000Z',
    dateTo: '2026-06-19T07:20:00.000Z', // 1 день
    destination: 3,
    isFavorite: true,
    offers: ['1'],
    type: getRandomArrayElement(POINT_TYPES),
  },
  {
    id: 5,
    basePrice: 1100,
    dateFrom: '2026-10-05T13:40:00.000Z',
    dateTo: '2026-10-08T18:10:00.000Z', // ~3 дня
    destination: 3,
    isFavorite: true,
    offers: ['1'],
    type: getRandomArrayElement(POINT_TYPES),
  },
  {
    id: 6,
    basePrice: 750,
    dateFrom: '2026-03-24T10:00:00.000Z', // 3 дня назад
    dateTo: '2026-03-28T18:00:00.000Z', // через 2 дня
    destination: 1,
    isFavorite: false,
    offers: ['1'],
    type: POINT_TYPES[0],
  },
];

const destinationsMock = [
  {
    id: 1,
    description:
      'Chamonix Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, enim!',
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
      'Geneva Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, enim!',
    name: 'Geneva',
    pictures: [
      {
        src: 'img/photos/2.jpg',
        description: 'Lorem ipsum dolor sit.',
      },
      {
        src: 'img/photos/4.jpg',
        description: 'Lorem ipsum dolor sit.',
      },
    ],
  },
  {
    id: 3,
    description:
      'Amsterdam Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, enim!',
    name: 'Amsterdam',
    pictures: [
      {
        src: 'img/photos/1.jpg',
        description: 'Lorem ipsum dolor sit.',
      },
      {
        src: 'img/photos/3.jpg',
        description: 'Lorem ipsum dolor sit.',
      },
    ],
  },
];

export { items, offersList, destinationsMock };
