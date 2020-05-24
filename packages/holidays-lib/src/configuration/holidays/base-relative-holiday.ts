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
    return super.validate().concat(this.validateFix());
  }
  // </editor-fold>
}
