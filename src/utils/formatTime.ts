import { formatDistanceStrict, formatDistanceToNow } from 'date-fns';

export const fDistanceToNow = (date: Date) =>
  formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
export const fDistanceStrict = (date: Date) => formatDistanceStrict(new Date(date) || new Date(), new Date());
