import { Fixed } from './fixed';
import { Holiday } from './holiday';
import { Weekday } from './weekday';
import { When } from './when';
import { Which } from './which';

export interface FixedWeekdayRelativeToFixed extends Holiday {
  day: Fixed;
  which: Which;
  weekday: Weekday;
  when: When;
}
