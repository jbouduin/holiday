import { IBaseHoliday, BaseHoliday } from './base-holiday';
import { HolidayType } from './holiday-type';
import { IFix } from './fix';
import { Weekday } from './weekday';
import { When } from './when';

export interface IBaseRelativeHoliday<T extends IFix> extends IBaseHoliday<string> {
  fix: T;
  weekday: Weekday;
  when: When;
}

export abstract class BaseRelativeHoliday<T> extends BaseHoliday<string> implements IBaseRelativeHoliday<T> {

  // <editor-fold desc='Constructor & C°'>
  public constructor(
    holidayType: HolidayType,
    key: string,
    public fix: T,
    public when: When,
    public weekday: Weekday) {
    super(holidayType, key);
  }
  // </editor-fold>

  // <editor-fold desc='Abstract methods'>
  public abstract validateFix(): Array<string>;
  // </editor-fold>

  // <editor-fold desc='Base class methods overrides'>
  public validate(): Array<string> {
    const result = super.validate().concat(this.validateFix());
    if (this.key === '') {
      result.push('holiday has no valid key');
    }

    if (this.when === undefined) {
      result.push(`relative to date holiday '${this.key}'' has no valid when`);
    }

    if (this.weekday === undefined) {
      result.push(`relative to date holiday '${this.key}'' has no valid weekday`);
    }
    return result;
  }
  // </editor-fold>
}
