import { IFixedDate } from '../specifics';
import { Category, Cycle, HolidayType, Month } from '../types';
import { IBaseHoliday, BaseHoliday } from './base-holiday';

export interface IFixedDateHoliday extends IBaseHoliday<string>, IFixedDate { }

export class FixedDateHoliday extends BaseHoliday<string> implements IFixedDateHoliday {

  // <editor-fold desc='IFixedDate interface members'>
  public month: Month;
  public day: number;
  // </editor-fold>

  // <editor-fold desc='Constructor'>
  public constructor(
    key: string,
    category: Category,
    cycle: Cycle,
    validFrom: number,
    validTo: number,
    fixedDate: IFixedDate) {
    super(HolidayType.FIXED_DATE, key, category, cycle, validFrom, validTo);

    this.month = fixedDate.month;
    this.day = fixedDate.day;
  }
  // </editor-fold>

  // <editor-fold desc='Abstract method implementations'>
  public get stringKey(): string {
    return this.key;
  }

  public get translationKey(): string {
    return this.key;
  }
  // </editor-fold>
}
