import { Month } from '../types';
import { IFix } from './fix';

export interface IFixedDate extends IFix {
  day: number;
  month: Month;
}
