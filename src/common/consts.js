const SORTS = [
  {
    name: 'day',
    disabled: false,
  },
  {
    name: 'event',
    disabled: true,
  },
  {
    name: 'time',
    disabled: false,
  },
  {
    name: 'price',
    disabled: false,
  },
  {
    name: 'offers',
    disabled: true,
  },
];

const FILTERS = [
  {
    name: 'everything',
    checked: true,
  },
  {
    name: 'future',
    checked: false,
  },
  {
    name: 'present',
    checked: false,
  },
  {
    name: 'past',
    checked: false,
  },
];

const POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const TIME = {
  MS_IN_MIN: 6e4,
  SEC_IN_MIN: 6e1,
  HRS_IN_DAY: 24,
};

const FORMAT_TIME = {
  MD: 'MMM DD',
  H: 'HH:mm',
  FULL: 'MM/DD/YY HH:mm',
};

const NEW_POINT = {
  basePrice: 0,
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  destinations: 0,
  isFavorite: false,
  offers: [],
  type: POINT_TYPES[0],
};

export { SORTS, FILTERS, POINT_TYPES, TIME, FORMAT_TIME, NEW_POINT };
