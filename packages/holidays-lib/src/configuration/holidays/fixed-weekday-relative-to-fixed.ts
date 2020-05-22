import { IFixedDate } from './fixed-date';
import { IBaseHoliday } from './base-holiday';
import { Weekday } from './weekday';
import { When } from './when';
import { Which } from './which';

export interface FixedWeekdayRelativeToFixed extends IBaseHoliday<string> {
  day: IFixedDate;
  which: Which;
  weekday: Weekday;
  when: When;
}
