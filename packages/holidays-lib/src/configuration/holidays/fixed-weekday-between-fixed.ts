import { Fixed } from './fixed';
import { Holiday } from './holiday';
import { Weekday } from './weekday';

export interface FixedWeekdayBetweenFixed extends Holiday {
  from: Fixed;
  to: Fixed;
  weekday: Weekday;
}
