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

const EntityStates = {
  isDisabled: 'IS_DISABLED',
  isSaving: 'IS_SAVING',
  isDeleting: 'IS_DELETING',
  isShaking: 'IS_SHAKING',
  isReady: 'IS_READY',
};

const ApiSettings = {
  AUTHORIZATION: 'Basic gq6e9j3erl7TY',
  URL: 'https://22.objects.htmlacademy.pro/big-trip',
};

export {
  SortTypes,
  FilterTypes,
  UpdateTypes,
  AppStates,
  FormModes,
  DateTypes,
  EntityStates,
  ApiSettings,
};
