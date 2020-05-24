import { IFix } from './fix';
import { Month } from './month';
import { Weekday } from './weekday';
import { Which } from './which';

export interface IFixedWeekday extends IFix {
  which: Which;
  weekday: Weekday;
  month: Month;
}
