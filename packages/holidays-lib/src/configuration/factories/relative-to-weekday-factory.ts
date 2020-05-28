import { ErrorKey } from '../errors';
import { IRelativeHoliday, RelativeHoliday } from '../holidays';
import { IFixedWeekday, IRelationWhichWeekdayWhen } from '../specifics';
import { Category, Cycle, HolidayType } from '../types';
import { Weekday, WeekdayKeyStrings } from '../types';
import { When, WhenKeyStrings } from '../types';
import { Which, WhichKeyStrings } from '../types';
import { IBaseFactory, BaseFactory } from './base-factory';

export interface IRelativeToWeekdayFactory extends IBaseFactory<IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday>, string> { }

export class RelativeToWeekdayFactory
  extends BaseFactory<IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday>, string>
  implements IRelativeToWeekdayFactory {

  // <editor-fold desc='Private properties'>
  private fix!: IFixedWeekday;
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
    category: Category,
    cycle: Cycle,
    validFrom: number,
    validTo: number): IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday> {

    return new RelativeHoliday(
      HolidayType.RELATIVE_TO_WEEKDAY,
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
    } else if (!obj.fix.which && !obj.fix.weekday && !obj.fix.month) {
      this.addError(ErrorKey.RELATIVE_FIX_EMPTY);
    } else {
      this.fix = this.dataExtractor.extractFixedWeekday(obj.fix);
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
  // </editor-fold>
}
