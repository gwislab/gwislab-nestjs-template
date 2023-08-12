import * as moment from 'moment';

export const getSecondsLeft = (date: moment.Moment) =>
  moment(date).diff(moment(), 'seconds');
