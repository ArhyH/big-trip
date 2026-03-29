import dayjs from 'dayjs';
import { FilterTypes, SortTypes } from './app';

const SortComparators = {
  [SortTypes.DAY]: null,
  [SortTypes.EVENT]: null,
  [SortTypes.TIME]: (a, b) =>
    dayjs(b.dateTo).diff(b.dateFrom) - dayjs(a.dateTo).diff(a.dateFrom),
  [SortTypes.PRICE]: (a, b) => b.basePrice - a.basePrice,
  [SortTypes.OFFERS]: (a, b) => b.offers.length - a.offers.length,
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
