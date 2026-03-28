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
  MIN_IN_HR: 6e1,
  HRS_IN_DAY: 24,
  MIN_IN_DAY: 1440,
};

const FORMAT_TIME = {
  MD: 'MMM DD',
  DM: 'DD MMM',
  H: 'HH:mm',
  FULL: 'DD/MM/YY HH:mm',
};

const NEW_POINT = {
  basePrice: 0,
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  destination: 0,
  isFavorite: false,
  offers: [],
  type: POINT_TYPES[5],
};

const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const FilterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const HintTexts = {
  listEmpty: 'Click New Event to create your first point',
  pastFilterEmpty: 'There are no past events',
  presentListEmpty: 'There are no present events',
  futureListEmpty: 'There are no future events',
  loading: 'Loading...',
  dataLoadError: 'Failed to load latest route information',
};

const UpdateTypes = {
  FullChange: 'FULL_CHANGE',
  SinglePointUpdate: 'SINGLE_POINT_UPDATE',
};

const FormModes = {
  Update: 'UPDATE',
  Create: 'CREATE',
};

const DateTypes = {
  dateFrom: 'dateFrom',
  dateTo: 'dateTo',
};

export {
  POINT_TYPES,
  TIME,
  FORMAT_TIME,
  NEW_POINT,
  SortTypes,
  FilterTypes,
  HintTexts,
  UpdateTypes,
  FormModes,
  DateTypes,
};
