import { IFixed } from './fixed';
import { IHoliday } from './holiday';
import { Weekday } from './weekday';

export interface FixedWeekdayBetweenFixed extends IHoliday {
  from: IFixed;
  to: IFixed;
  weekday: Weekday;
}
