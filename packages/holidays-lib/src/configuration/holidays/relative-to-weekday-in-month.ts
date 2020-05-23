import { FixedWeekday } from './fixed-weekday';
import { IBaseHoliday } from './base-holiday';
import { Weekday } from './weekday';
import { When } from './when';

export interface IRelativeToWeekdayInMonth extends IBaseHoliday<string> {
  fixedWeekday: FixedWeekday;
  weekday: Weekday;
  when: When;
}
