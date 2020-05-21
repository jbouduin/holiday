import { FixedWeekdayInMonth } from './fixed-weekday-in-month';
import { Holiday } from './holiday';
import { Weekday } from './weekday';
import { When } from './when';

export interface RelativeToWeekdayInMonth {
  fixedWeekday: FixedWeekdayInMonth;
  weekday: Weekday;
  when: When;
}
