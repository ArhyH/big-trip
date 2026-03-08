import dayjs from 'dayjs';
import { FilterTypes, SortTypes } from './consts';

const sort = {
  [SortTypes.DAY]: null,
  [SortTypes.EVENT]: null,
  [SortTypes.TIME]: (a, b) =>
    dayjs(b.dateTo).diff(b.dateFrom) - dayjs(a.dateTo).diff(a.dateFrom),
  [SortTypes.PRICE]: (a, b) => b.price - a.price,
  [SortTypes.OFFERS]: (a, b) => b.offers.length - a.offers.length,
};

const filter = {
  [FilterTypes.EVERYTHING]: () => true,
  [FilterTypes.FUTURE]: (point) => dayjs().isBefore(point.dateFrom, 'D'),
  [FilterTypes.PRESENT]: (point) =>
    (dayjs().isBefore(point.dateFrom, 'D') ||
      dayjs().isSame(point.dateFrom, 'D')) &&
    (dayjs().isAfter(point.dateTo, 'D') || dayjs().isSame(point.dateTo, 'D')),
  [FilterTypes.PAST]: (point) => dayjs(point.dateTo).isBefore(dayjs(), 'D'),
};

const generateFilters = (points) =>
  Object.entries(filter).map(([filterType, filterPredicate]) => ({
    type: filterType,
    isDisabled: points.filter(filterPredicate).length === 0,
    // filter: points.filter(filterPredicate),
  }));

const generateSorts = (points) =>
  Object.entries(sort).map(([sortType]) => ({
    type: sortType,
    isDisabled: points.length < 2,
    // filter: sortComparator ? [...points].sort(sortComparator) : points,
  }));

export { sort, filter, generateFilters, generateSorts };
