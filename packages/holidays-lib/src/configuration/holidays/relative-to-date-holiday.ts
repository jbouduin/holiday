import { IFixedDate } from '../specifics';
import { CycleType, HolidayStatus, HolidayType, Month, Weekday, When } from '../types';
import { IBaseRelativeHoliday, BaseRelativeHoliday } from './base-relative-holiday';

export interface IRelativeToDateHoliday extends IBaseRelativeHoliday<IFixedDate> { }

export class RelativeToDateHoliday extends BaseRelativeHoliday<IFixedDate> implements IRelativeToDateHoliday {

  // <editor-fold desc='Constructor & C°'>
  public constructor(
    key: string,
    holidayStatus: HolidayStatus,
    cycleType: CycleType,
    validFrom: number,
    validTo: number,
    fix: IFixedDate,
    when: When,
    weekday: Weekday) {
    super(
      HolidayType.RELATIVE_TO_DATE,
      key,
      holidayStatus,
      cycleType,
      validFrom,
      validTo,
      fix,
      when,
      weekday);
  }
  // </editor-fold>

  // <editor-fold desc='Abstract methods implementation'>
  public get translationKey(): string {
    return this.key;
  }

  public validateFix(): Array<string> {
    const result = new Array<string>();

    // TODO: this is a copy from fix-date-holiday validation
    if (!this.fix.day || this.fix.day < 1 || this.fix.day > 31) {
      result.push(`Fixed of '${this.key}' has an invalid day`);
    }

    if (this.fix.month === undefined) {
      result.push(`Fix of '${this.key}' has no valid month`);
    } else {
      switch(this.fix.month) {
        case Month.APRIL:
        case Month.JUNE:
        case Month.SEPTEMBER:
        case Month.NOVEMBER: {
          if (this.fix.day > 30) {
            result.push(`Fix of '${this.key}' has an invalid day`);
          }
          break;
        }
        case Month.FEBRUARY: {
          if (this.fix.day > 29) {
            result.push(`Fixed of '${this.key}' has an invalid day`);
          }
          break;
        }
      }
    }
    return result;
  }
  // </editor-fold>
}
