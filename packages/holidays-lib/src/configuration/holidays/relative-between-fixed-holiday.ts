import { IBetweenFixedDates, IFixedDate } from '../specifics';
import { HolidayType, Month, Weekday, When } from '../types';
import { IBaseRelativeHoliday, BaseRelativeHoliday } from './base-relative-holiday';

export interface IRelativeBetweenFixedHoliday extends IBaseRelativeHoliday<IBetweenFixedDates> { }

export class RelativeBetweenFixedHoliday extends BaseRelativeHoliday<IBetweenFixedDates> implements IRelativeBetweenFixedHoliday {

  // <editor-fold desc='Constructor & C°'>
  public constructor(key: string, fix: IBetweenFixedDates, weekday: Weekday) {
    super(HolidayType.RELATIVE_BETWEEN_FIXED, key, fix, When.BEFORE, weekday);
  }
  // </editor-fold>

  // <editor-fold desc='Abstract methods implementation'>
  public get translationKey(): string {
    return this.key;
  }

  public validateFix(): Array<string> {
    return this.validateFixedDate(this.fix.from).concat(this.validateFixedDate(this.fix.to));
  }
  // </editor-fold>

  // <editor-fold desc='Private methods'>
  private validateFixedDate(fixedDate: IFixedDate): Array<string> {
    const result = new Array<string>();

    // TODO: this is a copy from fix-date-holiday validation
    if (!fixedDate.day || fixedDate.day < 1 || fixedDate.day > 31) {
      result.push(`Fixed of '${this.key}' has an invalid day`);
    }

    if (fixedDate.month === undefined) {
      result.push(`Fix of '${this.key}' has no valid month`);
    } else {
      switch(fixedDate.month) {
        case Month.APRIL:
        case Month.JUNE:
        case Month.SEPTEMBER:
        case Month.NOVEMBER: {
          if (fixedDate.day > 30) {
            result.push(`Fix of '${this.key}' has an invalid day`);
          }
          break;
        }
        case Month.FEBRUARY: {
          if (fixedDate.day > 29) {
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
