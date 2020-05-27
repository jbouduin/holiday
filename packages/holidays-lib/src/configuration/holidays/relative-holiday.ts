import { IFix, IRelation } from '../specifics';
import { CycleType, HolidayStatus, HolidayType, Weekday, When } from '../types';
import { IBaseHoliday, BaseHoliday } from './base-holiday';

export interface IRelativeHoliday<T extends IRelation, U extends IFix > extends IBaseHoliday<string> {
  fix: U;
  relation: T;
}

export class RelativeHoliday<T, U> extends BaseHoliday<string> implements IRelativeHoliday<T, U> {

  // <editor-fold desc='IBaseRelativeHoliday interface members'>
  public fix: U;
  public relation: T;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor(
    holidayType: HolidayType,
    key: string,
    holidayStatus: HolidayStatus,
    cycleType: CycleType,
    validFrom: number,
    validTo: number,
    relation: T,
    fix: U) {
    super(holidayType, key, holidayStatus, cycleType, validFrom, validTo);
    this.fix = fix;
    this.relation = relation;
  }
  // </editor-fold>

  // <editor-fold desc='Abstract methods implementation'>
  public get translationKey(): string {
    return this.key;
  }
  // </editor-fold>

}
