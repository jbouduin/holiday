import { ErrorKey } from '../errors';
import { IRelativeHoliday, RelativeHoliday } from '../holidays';
import { IFixedDate, IRelationWhichWeekdayWhen } from '../specifics';
import { Category, Cycle, HolidayType } from '../types';
import { Weekday, WeekdayKeyStrings } from '../types';
import { When, WhenKeyStrings } from '../types';
import { Which, WhichKeyStrings } from '../types';
import { IBaseFactory, BaseFactory } from './base-factory';

export interface IRelativeToDateFactory extends IBaseFactory<IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedDate>, string>{ }

export class RelativeToDateFactory
  extends BaseFactory<IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedDate>, string>
  implements IRelativeToDateFactory {

  //#region Private properties
  private fix!: IFixedDate;
  private relation!: IRelationWhichWeekdayWhen;
  //#endregion

  //#region Constructor & C°
  public constructor() {
    super();
  }
  //#endregion

  //#region Abstract methods implementation
  protected createHoliday(
    key: string,
    category: Category,
    cycle: Cycle,
    validFrom: number,
    validTo: number): IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedDate> {

    return new RelativeHoliday(
      HolidayType.RELATIVE_TO_DATE,
      key,
      category,
      cycle,
      validFrom,
      validTo,
      this.relation,
      this.fix);
  }

  protected extractData(obj: any): void {

    if (!obj.fix) {
      this.addError(ErrorKey.RELATIVE_FIX_MISSING);
    } else if (!obj.fix.day && !obj.fix.month) {
      this.addError(ErrorKey.RELATIVE_FIX_EMPTY);
    } else {
      this.fix = this.dataExtractor.extractFixedDate(obj.fix);
    }

    if (!obj.relation) {
      this.addError(ErrorKey.RELATIVE_RELATION_MISSING);
    } else if (!obj.relation.which && !obj.relation.weekday && !obj.relation.when) {
      this.addError(ErrorKey.RELATIVE_RELATION_EMPTY);
    } else {
      this.relation = this.dataExtractor.extractWhichWeekdayWhen(obj.relation);
    }
  }

  protected extractKey(obj: any): string {
    return this.dataExtractor.extractStringKey(obj);
  }
  //#endregion
}
