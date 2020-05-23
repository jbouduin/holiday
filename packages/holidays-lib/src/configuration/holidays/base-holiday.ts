import { CycleType } from './cycle-type';
import { HolidayStatus } from './holiday-status';
import { HolidayType } from './holiday-type';

export interface IBaseHoliday<T> {
  readonly key: T;
  cycleType: CycleType;
  holidayStatus: HolidayStatus;
  validFrom: number;
  validTo: number;
  readonly translationKey: string;
  readonly holidayType: HolidayType;
  validate(): Array<string>;
}

export abstract class BaseHoliday<T> implements IBaseHoliday<T> {

  // <editor-fold desc='Public static magic numbers'>
  public static undefinedValidFrom = -1;
  public static undefinedValidTo = -1;
  // </editor-fold>

  // <editor-fold desc='IHoliday interface members'>
  public validFrom: number;
  public validTo: number;
  public cycleType: CycleType;
  public holidayStatus: HolidayStatus;
  // </editor-fold>

  // <editor-fold desc='Abstract methods'>
  public abstract get translationKey(): string;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor(public readonly holidayType: HolidayType, public readonly key: T) {
    this.cycleType = CycleType.EVERY_YEAR;
    this.holidayStatus = HolidayStatus.OFFICIAL_HOLIDAY;
    this.validFrom = BaseHoliday.undefinedValidFrom;
    this.validTo = BaseHoliday.undefinedValidTo;
  }
  // </editor-fold>

  // <editor-fold desc='IBaseHoliday interface methods'>
  public validate(): Array<string> {
    const result = new Array<string>();
    if (this.key === undefined) {
      result.push('holiday has no valid key');
    }
    switch (this.cycleType) {
      case CycleType.TWO_YEARS:
      case CycleType.FOUR_YEARS:
      case CycleType.FIVE_YEARS:
      case CycleType.SIX_YEARS: {
        if (this.validFrom === BaseHoliday.undefinedValidTo) {
          result.push(`Fixed holiday '${this.key}' has a cycle type '${this.cycleType}' but no valid from`);
          break;
        }
      }
    }
    return result;
  }
  // </editor-fold>
}
