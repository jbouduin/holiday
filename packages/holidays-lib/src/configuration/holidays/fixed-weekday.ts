import { Month } from './month';
import { Weekday } from './weekday';
import { Which } from './which';

export interface FixedWeekday {
  which: Which;
  weekday: Weekday;
  month: Month;
}
