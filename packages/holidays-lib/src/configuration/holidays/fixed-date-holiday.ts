import { IFixedDate } from './fixed-date';
import { IBaseHoliday, BaseHoliday } from './base-holiday';
import { IMoveable } from './moveable';
import { IMovingCondition } from './moving-condition';
import { Month, MonthKeyStrings } from './month';
import { HolidayType } from './holiday-type';

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
