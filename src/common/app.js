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

const UpdateTypes = {
  FullChange: 'FULL_CHANGE',
  SinglePointUpdate: 'SINGLE_POINT_UPDATE',
};

const AppStates = {
  IsLoading: 'IS_LOADING',
  IsError: 'IS_ERROR',
  IsReady: 'IS_READY',
};

const FormModes = {
  Update: 'UPDATE',
  Create: 'CREATE',
};

const DateTypes = {
  dateFrom: 'dateFrom',
  dateTo: 'dateTo',
};

export { SortTypes, FilterTypes, UpdateTypes, AppStates, FormModes, DateTypes };
