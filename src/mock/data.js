// const item = [
//   {
//     id: 'f4b62099-293f-4c3d-a702-94eec4a2808c',
//     basePrice: 1100,
//     dateFrom: '2019-07-10T22:55:56.845Z',
//     dateTo: '2019-07-11T11:22:13.375Z',
//     destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
//     isFavorite: false,
//     offers: ['b4c3e4e6-9053-42ce-b747-e281314baa31'],
//     type: 'taxi',
//   },
// ];

// const destination = [
//   {
//     id: 1,
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, enim!',
//     name: 'Chamonix',
//     pictures: [
//       {
//         src: '',
//         description: 'Lorem ipsum dolor sit.',
//       },
//     ],
//   },
// ];

// const offer = [
//   {
//     type: 'taxi',
//     offers: [
//       {
//         id: 1,
//         title: 'Upgrade to a business class',
//         price: '120',
//       },
//     ],
//   },
// ];

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
];

const items = [
  {
    id: 1,
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 1,
    isFavorite: false,
    offers: [1],
    type: 'taxi',
  },
  {
    id: 2,
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 2,
    isFavorite: false,
    offers: [1, 2],
    type: 'flight',
  },
  {
    id: 3,
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 3,
    isFavorite: false,
    offers: [1],
    type: 'drive',
  },
  {
    id: 4,
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 3,
    isFavorite: true,
    offers: [1],
    type: 'drive',
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
