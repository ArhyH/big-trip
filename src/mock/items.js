// const item = [
//   {
//     id: 1,
//     base_price: 1100,
//     date_from: 1,
//     date_to: 1,
//     destination: 1,
//     isFavotite: true,
//     offers: '',
//     type: '',
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
        title: 'Switch to comfort',
        price: 80,
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
    date: 'MAR 18',
    type: 'taxi',
    destination: 'Amsterdam',
    startTime: '10:30',
    endTime: '11:00',
    duration: '30M',
    price: '20',
    offers: [1],
    isFavorite: true,
  },
  {
    date: 'MAR 18',
    type: 'flight',
    destination: 'Chamonix',
    startTime: '12:25',
    endTime: '13:34',
    duration: '1H 10M',
    price: '160',
    offers: [1, 2],
  },
  {
    date: 'MAR 18',
    type: 'drive',
    destination: 'Chamonix',
    startTime: '14:30',
    endTime: '16:05',
    duration: '1H 35M',
    price: '20',
    offers: [1],
  },
  {
    date: 'MAR 18',
    type: 'drive',
    destination: 'Chamonix',
    startTime: '14:30',
    endTime: '18:05',
    duration: '3H 35M',
    price: '220',
    offers: [1, 2],
  },
];

export { items, offersList };
