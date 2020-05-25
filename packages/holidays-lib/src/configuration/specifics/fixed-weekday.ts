import { Month, Weekday, Which } from '../types';
import { IFix } from './fix';

export interface IFixedWeekday extends IFix {
  which: Which;
  weekday: Weekday;
  month: Month;
}
