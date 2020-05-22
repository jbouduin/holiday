import { IFixedDate } from './fixed-date';
import { IBaseHoliday } from './base-holiday';
import { Weekday } from './weekday';

export interface FixedWeekdayBetweenFixed extends IBaseHoliday<string> {
  from: IFixedDate;
  to: IFixedDate;
  weekday: Weekday;
}
