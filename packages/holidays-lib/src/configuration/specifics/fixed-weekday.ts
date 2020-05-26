import { Month, Weekday, Which } from '../types';
import { IFix } from './fix';

export interface IFixedWeekday extends IFix {
  month: Month;
  weekday: Weekday;
  which: Which;
}
