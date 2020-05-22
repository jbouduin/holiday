import { IBaseHoliday } from './base-holiday';

export interface ITypedHoliday<T> extends IBaseHoliday {
  type: T;
}
