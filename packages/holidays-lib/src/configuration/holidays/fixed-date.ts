import { IFix } from './fix';
import { Month } from './month';

export interface IFixedDate extends IFix {
  day: number;
  month: Month;
}
