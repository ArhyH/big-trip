import dayjs from 'dayjs';
import { FilterTypes, SortTypes } from './config';

const SortComparators = {
  [SortTypes.DAY]: {
    comparator: null,
    isDisabled: false,
  },
  [SortTypes.EVENT]: {
    comparator: null,
    isDisabled: true,
  },
  [SortTypes.TIME]: {
    comparator: (a, b) =>
      dayjs(b.dateTo).diff(b.dateFrom) - dayjs(a.dateTo).diff(a.dateFrom),
    isDisabled: false,
  },
  [SortTypes.PRICE]: {
    comparator: (a, b) => b.basePrice - a.basePrice,
    isDisabled: false,
  },
  [SortTypes.OFFERS]: {
    comparator: (a, b) => b.offers.length - a.offers.length,
    isDisabled: false,
  },
};

const FilterPredicates = {
  [FilterTypes.EVERYTHING]: () => true,
  [FilterTypes.FUTURE]: (point) => dayjs().isBefore(point.dateFrom, 'D'),
  [FilterTypes.PRESENT]: (point) =>
    (dayjs(point.dateFrom).isBefore(dayjs(), 'D') ||
      dayjs(point.dateFrom).isSame(dayjs(), 'D')) &&
    (dayjs(point.dateTo).isAfter(dayjs(), 'D') ||
      dayjs(point.dateTo).isSame(dayjs(), 'D')),
  [FilterTypes.PAST]: (point) => dayjs(point.dateTo).isBefore(dayjs(), 'D'),
};

export { SortComparators, FilterPredicates };
