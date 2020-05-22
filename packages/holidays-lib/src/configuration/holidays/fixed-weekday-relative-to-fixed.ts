import { IFixed } from './fixed';
import { IBaseHoliday } from './base-holiday';
import { Weekday } from './weekday';
import { When } from './when';
import { Which } from './which';

export interface FixedWeekdayRelativeToFixed extends IBaseHoliday {
  day: IFixed;
  which: Which;
  weekday: Weekday;
  when: When;
}
