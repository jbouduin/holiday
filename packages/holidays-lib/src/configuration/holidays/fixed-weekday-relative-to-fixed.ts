import { IFixed } from './fixed';
import { IHoliday } from './holiday';
import { Weekday } from './weekday';
import { When } from './when';
import { Which } from './which';

export interface FixedWeekdayRelativeToFixed extends IHoliday {
  day: IFixed;
  which: Which;
  weekday: Weekday;
  when: When;
}
