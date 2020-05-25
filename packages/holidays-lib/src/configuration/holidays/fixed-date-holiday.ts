import { IFixedDate } from '../specifics';
import { CycleType, Month, HolidayStatus, HolidayType } from '../types';
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
    holidayStatus: HolidayStatus,
    cycleType: CycleType,
    validFrom: number,
    validTo: number,
    month: Month,
    day: number) {
    super(HolidayType.FIXED_DATE, key, holidayStatus, cycleType, validFrom, validTo);

    this.month = month;
    this.day = day;
  }
  // </editor-fold>

  // <editor-fold desc='Abstract method implementations'>
  public get translationKey(): string {
    return this.key;
  }
  // </editor-fold>

  // <editor-fold desc='Baseclass methods override'>
  public validate(): Array<string> {
    const result = super.validate();
    if (this.key === '') {
      result.push('holiday has no valid key');
    }

    if (!this.day || this.day < 1 || this.day > 31) {
      result.push(`Fixed holiday '${this.key}' has an invvalid day`);
    }

    if (this.month === undefined) {
      result.push(`Fixed holiday '${this.key}' has no valid month`);
    } else {
      switch(this.month) {
        case Month.APRIL:
        case Month.JUNE:
        case Month.SEPTEMBER:
        case Month.NOVEMBER: {
          if (this.day > 30) {
            result.push(`Fixed holiday '${this.key}' has an invalid day`);
          }
          break;
        }
        case Month.FEBRUARY: {
          if (this.day > 29) {
            result.push(`Fixed holiday '${this.key}' has an invalid day`);
          }
          break;
        }
      }
    }

    return result;
  }
  // </editor-fold>
}
