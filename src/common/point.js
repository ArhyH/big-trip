import dayjs from 'dayjs';

const PointTypes = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECKIN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant',
};

const NEW_POINT = {
  basePrice: 0,
  dateFrom: dayjs().toISOString(),
  dateTo: dayjs().add(1, 'hour').toISOString(),
  destination: 0,
  isFavorite: false,
  offers: [],
  type: PointTypes.FLIGHT,
};

export { PointTypes, NEW_POINT };
