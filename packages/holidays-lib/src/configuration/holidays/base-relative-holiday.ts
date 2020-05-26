import { IFix } from '../specifics';
import { CycleType, HolidayStatus, HolidayType, Weekday, When } from '../types';
import { IBaseHoliday, BaseHoliday } from './base-holiday';

export interface IBaseRelativeHoliday<T extends IFix> extends IBaseHoliday<string> {
  fix: T;
  weekday: Weekday;
  when: When;
}

export abstract class BaseRelativeHoliday<T> extends BaseHoliday<string> implements IBaseRelativeHoliday<T> {

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


}
