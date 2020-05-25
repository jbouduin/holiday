import { IFix } from './fix';
import { IFixedDate } from './fixed-date';

export interface IBetweenFixedDates extends IFix {
  from: IFixedDate;
  to: IFixedDate;
}
