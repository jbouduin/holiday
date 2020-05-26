import { IFixedWeekday } from '../specifics';
import { CycleType, HolidayStatus, HolidayType, Month, Weekday, Which } from '../types';
import { IBaseHoliday, BaseHoliday } from './base-holiday';

export interface IFixedWeekdayHoliday extends IBaseHoliday<string>, IFixedWeekday { }

export class FixedWeekdayHoliday extends BaseHoliday<string> implements IFixedWeekdayHoliday {

  // <editor-fold desc='IFixedWeekday interface members'>
  public month: Month;
  public weekday: Weekday;
  public which: Which;
  // </editor-fold>

  // <editor-fold desc='Constructor'>
  public constructor(
    key: string,
    holidayStatus: HolidayStatus,
    cycleType: CycleType,
    validFrom: number,
    validTo: number,
    fixedWeekday: IFixedWeekday) {
    super(HolidayType.FIXED_DATE, key, holidayStatus, cycleType, validFrom, validTo);
    this.month = fixedWeekday.month;
    this.weekday = fixedWeekday.weekday;
    this.which = fixedWeekday.which;
  }
  // </editor-fold>

  // <editor-fold desc='Abstract methods implementation'>
  public get translationKey(): string {
    return this.key;
  }
  // </editor-fold>
}
