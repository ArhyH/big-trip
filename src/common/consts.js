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

export { SORTS, FILTERS };
