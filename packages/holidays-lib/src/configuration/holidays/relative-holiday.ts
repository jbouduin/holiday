import { IFix, IRelation } from '../specifics';
import { Category, Cycle, HolidayType } from '../types';
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
    category: Category,
    cycle: Cycle,
    validFrom: number,
    validTo: number,
    relation: T,
    fix: U) {
    super(holidayType, key, category, cycle, validFrom, validTo);
    this.fix = fix;
    this.relation = relation;
  }
  // </editor-fold>

  // <editor-fold desc='Abstract methods implementation'>
  public get stringKey(): string {
    return this.key;
  }

  public get translationKey(): string {
    return this.key;
  }
  // </editor-fold>

}
