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
  // </editor-fold>
}
