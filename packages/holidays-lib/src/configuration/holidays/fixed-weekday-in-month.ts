import { IBaseHoliday } from './base-holiday';
import { Month } from './month';
import { Weekday } from './weekday';
import { Which } from './which';

export interface FixedWeekdayInMonth extends IBaseHoliday<string> {
  which: Which;
  weekday: Weekday;
  month: Month;
}
