import { ErrorKeys } from '../errors';
import { IRelativeHoliday, RelativeHoliday } from '../holidays';
import { IBetweenFixedDates } from '../specifics';
import { CycleType, HolidayStatus, HolidayType } from '../types';
import { Weekday, WeekdayKeyStrings } from '../types';
import { When } from '../types';
import { IBaseFactory, BaseFactory } from './base-factory';

export interface IRelativeBetweenFixedFactory extends IBaseFactory<IRelativeHoliday<IBetweenFixedDates>, string>{ }

export class RelativeBetweenFixedFactory
  extends BaseFactory<IRelativeHoliday<IBetweenFixedDates>, string>
  implements IRelativeBetweenFixedFactory {

  // <editor-fold desc='Private properties'>
  private fix!: IBetweenFixedDates;
  private weekday!: Weekday
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
    validTo: number): IRelativeHoliday<IBetweenFixedDates> {

    return new RelativeHoliday(
      HolidayType.RELATIVE_BETWEEN_FIXED,
      key,
      holidayStatus,
      cycleType,
      validFrom,
      validTo,
      this.fix,
      When.BEFORE,
      this.weekday);
  }

  protected extractData(obj: any): void {
    let canContinue = true;
    if (!obj.fix) {
      this.addError(ErrorKeys.RELATIVE_BETWEEN_FIXED_FIX_MISSING);
      canContinue = false;
    } else {
      if (!obj.fix.from && !obj.fix.to) {
        this.addError(ErrorKeys.RELATIVE_BETWEEN_FIXED_FIX_EMPTY);
        canContinue = false;
      } else {
        if (!obj.fix.from) {
          this.addError(ErrorKeys.RELATIVE_BETWEEN_FIXED_FROM_MISSING);
          canContinue = false;
        }
        if (!obj.fix.to) {
          this.addError(ErrorKeys.RELATIVE_BETWEEN_FIXED_TO_MISSING);
            canContinue = false;
        }
      }
    }
    this.weekday = Weekday[<WeekdayKeyStrings>obj.weekday];
    if (this.weekday === undefined) {
      if (obj.weekday) {
        this.addError(ErrorKeys.RELATIVE_BETWEEN_FIXED_WEEKDAY_INVALID, obj.weekday);
      } else {
        this.addError(ErrorKeys.RELATIVE_BETWEEN_FIXED_WEEKDAY_MISSING);
      }
    }

    if (canContinue) {
      this.fix = {
        from: this.extractFixedDate(obj.fix.from),
        to: this.extractFixedDate(obj.fix.to)
      }
      if (this.fix.from.day !== 0 && this.fix.to.day !== 0) {
        const fromDate = new Date(1986, this.fix.from.month, this.fix.from.day);
        const toDate = new Date(1986, this.fix.to.month, this.fix.to.day);
        if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
          const timeSpan = toDate.getTime() - fromDate.getTime();
          if (timeSpan < 0) {
            this.addError(ErrorKeys.RELATIVE_BETWEEN_FIXED_FIX_TO_BEFORE_FROM, obj.fix);
          } else if (timeSpan !== 6 * 24 * 60 * 60 * 1000 ) { // 518400000 is a week
            this.addError(ErrorKeys.RELATIVE_BETWEEN_FIXED_SPAN_INVALID, obj.fix);
          }
        }
      }
    };
  }

  protected extractKey(obj: any): string {
    return this.extractStringKey(obj);
  }
  // </editor-fold>
}
