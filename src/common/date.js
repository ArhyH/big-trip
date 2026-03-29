import dayjs from 'dayjs';
import { TIME } from './time';

const getDateInFormat = (date, format) =>
  date ? dayjs(date).format(format) : '';

const getDiffInTime = (start, end) => {
  const diff = dayjs(end).diff(start, 'minute');

  const days = Math.floor(diff / TIME.MIN_IN_DAY);
  const hours = Math.floor((diff % TIME.MIN_IN_DAY) / TIME.MIN_IN_HR);
  const mins = diff % TIME.MIN_IN_HR;

  const pad = (str) => str.toString().padStart(2, '0');

  if (days > 0) {
    return `${pad(days)}D ${pad(hours)}H ${pad(mins)}M`;
  }

  if (hours > 0) {
    return `${pad(hours)}H ${pad(mins)}M`;
  }

  return `${pad(mins)}M`;
};

export { getDateInFormat, getDiffInTime };
