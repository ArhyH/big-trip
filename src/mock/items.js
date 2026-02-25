const items = [
  {
    date: 'MAR 18',
    icon: 'taxi',
    title: 'Taxi Amsterdam',
    startTime: '10:30',
    endTime: '11:00',
    duration: '30M',
    price: '20',
    offers: [
      {
        name: 'Order Uber',
        price: '20',
      },
    ],
    isFavorite: true,
  },
  {
    date: 'MAR 18',
    icon: 'flight',
    title: 'Flight Chamonix',
    startTime: '12:25',
    endTime: '13:34',
    duration: '1H 10M',
    price: '160',
    offers: [
      {
        name: 'Add luggage',
        price: '50',
      },
      {
        name: 'Switch to comfort',
        price: '80',
      },
    ],
  },
  {
    date: 'MAR 18',
    icon: 'drive',
    title: 'Drive Chamonix',
    startTime: '14:30',
    endTime: '16:05',
    duration: '1H 35M',
    price: '20',
    offers: [
      {
        name: 'Rent a car',
        price: '200',
      },
    ],
  },
];

export { items };
