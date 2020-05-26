import { IFix } from '../specifics';
import { CycleType, HolidayStatus, HolidayType, Weekday, When } from '../types';
import { IBaseHoliday, BaseHoliday } from './base-holiday';

export interface IRelativeHoliday<T extends IFix> extends IBaseHoliday<string> {
  fix: T;
  weekday: Weekday;
  when: When;
}

export class RelativeHoliday<T> extends BaseHoliday<string> implements IRelativeHoliday<T> {

  // <editor-fold desc='IBaseRelativeHoliday interface members'>
  public fix: T;
  public when: When;
  public weekday: Weekday;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor(
    holidayType: HolidayType,
    key: string,
    holidayStatus: HolidayStatus,
    cycleType: CycleType,
    validFrom: number,
    validTo: number,
    fix: T,
    when: When,
    weekday: Weekday) {
    super(holidayType, key, holidayStatus, cycleType, validFrom, validTo);
    this.fix = fix;
    this.when = when;
    this.weekday = weekday;
  }
  // </editor-fold>

  // <editor-fold desc='Abstract methods implementation'>
  public get translationKey(): string {
    return this.key;
  }
  // </editor-fold>

}
