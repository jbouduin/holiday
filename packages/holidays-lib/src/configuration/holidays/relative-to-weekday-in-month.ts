import { FixedWeekdayInMonth } from './fixed-weekday-in-month';
import { IBaseHoliday } from './base-holiday';
import { Weekday } from './weekday';
import { When } from './when';

export interface IRelativeToWeekdayInMonth extends IBaseHoliday {
  fixedWeekday: FixedWeekdayInMonth;
  weekday: Weekday;
  when: When;
}
