import { ErrorKey } from '../errors';
import { IRelativeHoliday, RelativeHoliday } from '../holidays';
import { IBetweenFixedDates, IRelationWeekday } from '../specifics';
import { Category, CycleType, HolidayType } from '../types';
import { Weekday, WeekdayKeyStrings } from '../types';
import { When } from '../types';
import { IBaseFactory, BaseFactory } from './base-factory';

export interface IRelativeBetweenFixedFactory extends IBaseFactory<IRelativeHoliday<IRelationWeekday, IBetweenFixedDates>, string>{ }

export class RelativeBetweenFixedFactory
  extends BaseFactory<IRelativeHoliday<IRelationWeekday, IBetweenFixedDates>, string>
  implements IRelativeBetweenFixedFactory {

  // <editor-fold desc='Private properties'>
  private fix!: IBetweenFixedDates;
  private relation!: IRelationWeekday;
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
    cycle: CycleType,
    validFrom: number,
    validTo: number): IRelativeHoliday<IRelationWeekday, IBetweenFixedDates> {

    return new RelativeHoliday(
      HolidayType.RELATIVE_BETWEEN_FIXED,
      key,
      category,
      cycle,
      validFrom,
      validTo,
      this.relation,
      this.fix);
  }

  protected extractData(obj: any): void {
    let canContinue = true;
    if (!obj.fix) {
      this.addError(ErrorKey.RELATIVE_FIX_MISSING);
      canContinue = false;
    } else {
      if (!obj.fix.from && !obj.fix.to) {
        this.addError(ErrorKey.RELATIVE_FIX_EMPTY);
        canContinue = false;
      } else {
        if (!obj.fix.from) {
          this.addError(ErrorKey.RELATIVE_BETWEEN_FIXED_FROM_MISSING);
          canContinue = false;
        }
        if (!obj.fix.to) {
          this.addError(ErrorKey.RELATIVE_BETWEEN_FIXED_TO_MISSING);
            canContinue = false;
        }
      }
    }

    if (!obj.relation) {
      this.addError(ErrorKey.RELATIVE_RELATION_MISSING);
    } else {
      if (!obj.relation.weekday && obj.relation.weekday !== '') {
        this.addError(ErrorKey.RELATIVE_RELATION_EMPTY);
      } else {
        const weekday = Weekday[<WeekdayKeyStrings>obj.relation.weekday];
        if (weekday === undefined) {
          this.addError(ErrorKey.RELATION_WEEKDAY_INVALID, obj.weekday);
        } else {
          this.relation = { weekday };
        }
      }
    }

    if (canContinue) {
      this.fix = {
        from: this.dataExtractor.extractFixedDate(obj.fix.from),
        to: this.dataExtractor.extractFixedDate(obj.fix.to)
      }
      if (this.fix.from.day !== 0 && this.fix.to.day !== 0) {
        const fromDate = new Date(1986, this.fix.from.month, this.fix.from.day);
        const toDate = new Date(1986, this.fix.to.month, this.fix.to.day);
        if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
          const timeSpan = toDate.getTime() - fromDate.getTime();
          if (timeSpan < 0) {
            this.addError(ErrorKey.RELATIVE_BETWEEN_FIXED_FIX_TO_BEFORE_FROM, obj.fix);
          } else if (timeSpan !== 6 * 24 * 60 * 60 * 1000 ) { // 518400000 is a week
            this.addError(ErrorKey.RELATIVE_BETWEEN_FIXED_SPAN_INVALID, obj.fix);
          }
        }
      }
    };
  }

  protected extractKey(obj: any): string {
    return this.dataExtractor.extractStringKey(obj);
  }
  // </editor-fold>
}
