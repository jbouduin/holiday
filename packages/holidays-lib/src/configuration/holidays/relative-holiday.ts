import { IFix, IRelation } from '../specifics';
import { Category, Cycle, HolidayType } from '../types';
import { IBaseHoliday, BaseHoliday } from './base-holiday';

export interface IRelativeHoliday<T extends IRelation, U extends IFix > extends IBaseHoliday<string> {
  fix: U;
  relation: T;
}

export class RelativeHoliday<T extends IRelation, U extends IFix> extends BaseHoliday<string> implements IRelativeHoliday<T, U> {

  //#region IBaseRelativeHoliday interface members
  public fix: U;
  public relation: T;
  //#endregion

  //#region Constructor & C°
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
  //#endregion

  //#region Abstract methods implementation
  public get stringKey(): string {
    return this.key;
  }

  public get translationKey(): string {
    return this.key;
  }
  //#endregion

}
