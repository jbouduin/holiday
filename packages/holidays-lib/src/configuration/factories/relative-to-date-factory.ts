import { ErrorKeys } from '../errors';
import { IRelativeHoliday, RelativeHoliday } from '../holidays';
import { IFixedDate, IRelationWhichWeekdayWhen } from '../specifics';
import { CycleType, HolidayStatus, HolidayType } from '../types';
import { Weekday, WeekdayKeyStrings } from '../types';
import { When, WhenKeyStrings } from '../types';
import { Which, WhichKeyStrings } from '../types';
import { IBaseFactory, BaseFactory } from './base-factory';

export interface IRelativeToDateFactory extends IBaseFactory<IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedDate>, string>{ }

export class RelativeToDateFactory
  extends BaseFactory<IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedDate>, string>
  implements IRelativeToDateFactory {

  // <editor-fold desc='Private properties'>
  private fix!: IFixedDate;
  private relation!: IRelationWhichWeekdayWhen;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor() {
    super();
  }
  // </editor-fold>

  // <editor-fold desc='Abstract methods implementation'>
  protected createHoliday(
    key: string,
    holidayStatus: HolidayStatus,
    cycleType: CycleType,
    validFrom: number,
    validTo: number): IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedDate> {

    return new RelativeHoliday(
      HolidayType.RELATIVE_BETWEEN_FIXED,
      key,
      holidayStatus,
      cycleType,
      validFrom,
      validTo,
      this.relation,
      this.fix);
  }

  protected extractData(obj: any): void {

    if (!obj.fix) {
      this.addError(ErrorKeys.RELATIVE_FIX_MISSING);
    } else if (!obj.fix.day && !obj.fix.month) {
      this.addError(ErrorKeys.RELATIVE_FIX_EMPTY);
    } else {
      this.fix = this.extractFixedDate(obj.fix);
    }

    if (!obj.relation) {
      this.addError(ErrorKeys.RELATIVE_RELATION_MISSING);
    } else if (!obj.relation.which && !obj.relation.weekday && !obj.relation.when) {
      this.addError(ErrorKeys.RELATIVE_RELATION_EMPTY);
    } else {
      this.relation = this.extractWhichWeekdayWhen(obj.relation);
    }
  }

  protected extractKey(obj: any): string {
    return this.extractStringKey(obj);
  }
  // </editor-fold>
}
