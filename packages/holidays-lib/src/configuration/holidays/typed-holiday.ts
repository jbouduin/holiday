import { IHoliday, Holiday } from './holiday';

export interface ITypedHoliday<T> extends IHoliday {
  type: T;
}
