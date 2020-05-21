import { Holiday } from './holiday';
import { Month } from './month';
import { Weekday } from './weekday';
import { Which } from './which';

export interface FixedWeekdayInMonth {
  which: Which;
  weekday: Weekday;
  month: Month;
}
