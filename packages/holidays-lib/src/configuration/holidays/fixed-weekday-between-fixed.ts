import { IFixed } from './fixed';
import { IBaseHoliday } from './base-holiday';
import { Weekday } from './weekday';

export interface FixedWeekdayBetweenFixed extends IBaseHoliday {
  from: IFixed;
  to: IFixed;
  weekday: Weekday;
}
