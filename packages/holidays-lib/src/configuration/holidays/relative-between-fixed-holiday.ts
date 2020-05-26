import { IBetweenFixedDates, IFixedDate } from '../specifics';
import { CycleType, HolidayStatus, HolidayType, Weekday, When } from '../types';
import { IBaseRelativeHoliday, BaseRelativeHoliday } from './base-relative-holiday';

export interface IRelativeBetweenFixedHoliday extends IBaseRelativeHoliday<IBetweenFixedDates> { }

export class RelativeBetweenFixedHoliday extends BaseRelativeHoliday<IBetweenFixedDates> implements IRelativeBetweenFixedHoliday {

  // <editor-fold desc='Constructor & C°'>
  public constructor(
    key: string,
    holidayStatus: HolidayStatus,
    cycleType: CycleType,
    validFrom: number,
    validTo: number,
    fix: IBetweenFixedDates,
    weekday: Weekday) {
    super(
      HolidayType.RELATIVE_BETWEEN_FIXED,
      key,
      holidayStatus,
      cycleType,
      validFrom,
      validTo,
      fix,
      When.BEFORE, // is not used in fixedbetween, so any value is ok
      weekday);
  }
  // </editor-fold>

  // <editor-fold desc='Abstract methods implementation'>
  public get translationKey(): string {
    return this.key;
  }
  // </editor-fold>

}
