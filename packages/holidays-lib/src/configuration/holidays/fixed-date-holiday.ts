import { CycleType } from './cycle-type';
import { IFixedDate } from './fixed-date';
import { IBaseHoliday, BaseHoliday } from './base-holiday';
import { HolidayType } from './holiday-type';
import { IMoveable } from './moveable';
import { IMovingCondition } from './moving-condition';
import { Month, MonthKeyStrings } from './month';

export interface IFixedDateHoliday extends IBaseHoliday<string>, IFixedDate, IMoveable { }

export class FixedDateHoliday extends BaseHoliday<string> implements IFixedDateHoliday {

  // <editor-fold desc='IMoveable interface properties'>
  public movingConditions: Array<IMovingCondition>;
  // </editor-fold>

  // <editor-fold desc='Constructor'>
  public constructor(key: string, public month: Month, public day: number) {
    super(HolidayType.FIXED_DATE, key);
    this.movingConditions = new Array<IMovingCondition>();
  }
  // </editor-fold>

  // <editor-fold desc='Abstract method implementations'>
  public get translationKey(): string {
    return this.key;
  }
  // </editor-fold>

  // <editor-fold desc='Baseclass methods override'>
  public validate(): Array<string> {
    const result = super.validate();
    if (this.key === '') {
      result.push('holiday has no valid key');
    }
    if (this.month === undefined) {
      result.push(`Fixed holiday '${this.key}'' has no valid month`);
    }
    if (!this.day || this.day < 1 || this.day > 31) {
      result.push(`Fixed holiday '${this.key}' has no valid day`);
    }
    return result;
  }
  // </editor-fold>
}
