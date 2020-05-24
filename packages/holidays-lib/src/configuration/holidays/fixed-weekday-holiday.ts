import { IFixedWeekday } from './fixed-weekday';
import { IBaseHoliday, BaseHoliday } from './base-holiday';
import { HolidayType } from './holiday-type';
import { Month } from './month';
import { Weekday } from './weekday';
import { Which } from './which';

export interface IFixedWeekdayHoliday extends IBaseHoliday<string>, IFixedWeekday { }

export class FixedWeekdayHoliday extends BaseHoliday<string> implements IFixedWeekdayHoliday {

  // <editor-fold desc='Constructor'>
  public constructor(key: string, public which: Which, public weekday: Weekday, public month: Month) {
    super(HolidayType.FIXED_DATE, key);
  }
  // </editor-fold>

  // <editor-fold desc='Abstract methods implementation'>
  public get translationKey(): string {
    return this.key;
  }
  // </editor-fold>

  // <editor-fold desc='Base class methods override'>
  public validate(): Array<string> {
    const result = super.validate();
    if (this.key === '') {
      result.push('holiday has no valid key');
    }
    if (this.which === undefined) {
      result.push(`Fixed weekday holiday '${this.key}'' has no which`);
    }

    if (this.weekday === undefined) {
      result.push(`Fixed weekday holiday '${this.key}'' has no valid weekday`);
    }

    if (this.month === undefined) {
      result.push(`Fixed holiday '${this.key}'' has no valid month`);
    }
    return result;
  }
  // </editor-fold>
}
