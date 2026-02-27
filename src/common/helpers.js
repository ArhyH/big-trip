import dayjs from 'dayjs';
import { TIME } from './consts';

const getRandomArrayElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

const getDateInFormat = (date, format) =>
  date ? dayjs(date).format(format) : '';

const getDiffInTime = (start, end) => {
  const diff = dayjs(end).diff(start) / TIME.MS_IN_MIN;

  if (diff < TIME.SEC_IN_MIN) {
    return dayjs(diff).format('mm[M]');
  }

  if (diff > TIME.SEC_IN_MIN && diff < TIME.SEC_IN_MIN * TIME.HRS_IN_DAY) {
    return dayjs(diff).format('HH[H] mm[M]');
  }

  return dayjs(diff).format('DD[D] HH[H] MM[M]');
};

export { getRandomArrayElement, getDateInFormat, getDiffInTime };
