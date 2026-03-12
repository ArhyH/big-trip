import dayjs from 'dayjs';
import { FilterTypes, SortTypes } from './consts';

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
    (dayjs().isBefore(point.dateFrom, 'D') ||
      dayjs().isSame(point.dateFrom, 'D')) &&
    (dayjs().isAfter(point.dateTo, 'D') || dayjs().isSame(point.dateTo, 'D')),
  [FilterTypes.PAST]: (point) => dayjs(point.dateTo).isBefore(dayjs(), 'D'),
};

export { SortComparators, FilterPredicates };
