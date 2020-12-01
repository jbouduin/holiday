import { IFixedDate } from '../specifics';
import { Category, Cycle, HolidayType, Month } from '../types';
import { IBaseHoliday, BaseHoliday } from './base-holiday';

export interface IFixedDateHoliday extends IBaseHoliday<string>, IFixedDate { }

export class FixedDateHoliday extends BaseHoliday<string> implements IFixedDateHoliday {

  //#region IFixedDate interface members
  public month: Month;
  public day: number;
  //#endregion

  //#region Constructor
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
  //#endregion

  //#region Abstract method implementations
  public get stringKey(): string {
    return this.key;
  }

  public get translationKey(): string {
    return this.key;
  }
  //#endregion
}
