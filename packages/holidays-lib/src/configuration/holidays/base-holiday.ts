import { IMovingCondition } from '../specifics';
import { CycleType, HolidayStatus, HolidayType } from '../types';

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
  // see http://ecma-international.org/ecma-262/5.1/#sec-15.9.1.1
  // undefined valid from is approx. the earliest date possible in JS
  public static undefinedValidFrom = new Date(-8640000000000000).getFullYear();
  // undefined valid from is approx. the latest date possible in JS
  public static undefinedValidTo = new Date(8640000000000000).getFullYear();
  // </editor-fold>

  // <editor-fold desc='IHoliday interface members'>
  public readonly holidayType: HolidayType;
  public readonly key: T
  public validFrom: number;
  public validTo: number;
  public cycleType!: CycleType;
  public holidayStatus!: HolidayStatus;
  public readonly movingConditions: Array<IMovingCondition>;
  // </editor-fold>

  // <editor-fold desc='Abstract methods'>
  public abstract get translationKey(): string;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor(
    holidayType: HolidayType,
    key: T,
    // TODO make params mandatory
    holidayStatus?: HolidayStatus,
    cycleType?: CycleType,
    validFrom?: number,
    validTo?: number) {
    this.holidayType = holidayType;
    this.key = key;
    if (holidayStatus !== undefined) { this.holidayStatus = holidayStatus; }
    if (cycleType !== undefined) { this.cycleType = cycleType; }
    this.validFrom = validFrom || BaseHoliday.undefinedValidFrom;
    this.validTo = validTo || BaseHoliday.undefinedValidTo;
    this.movingConditions = new Array<IMovingCondition>();
  }
  // </editor-fold>

  // <editor-fold desc='IBaseHoliday interface methods'>
  public validate(): Array<string> {
    const result = new Array<string>();
    if (this.key === undefined) {
      result.push('holiday has no valid key');
    }

    if (this.cycleType === undefined) {
      result.push(`Holiday '${this.key}' has no valid cycleType`);
    } else {
      switch (this.cycleType) {
        case CycleType.TWO_YEARS:
        case CycleType.FOUR_YEARS:
        case CycleType.FIVE_YEARS:
        case CycleType.SIX_YEARS: {
          if (this.validFrom === BaseHoliday.undefinedValidFrom) {
            result.push(`Holiday '${this.key}' has a cycle type '${this.cycleType}' but no valid from`);
            break;
          }
        }
      }
    }

    if (this.holidayStatus === undefined) {
      result.push(`Holiday '${this.key}' has no valid holiday status`);
    }

    if (!this.validFrom) {
      result.push(`Holiday '${this.key}' has no valid from`);
    }

    if (!this.validTo) {
      result.push(`Holiday '${this.key}' has no valid to`);
    }

    if (this.validFrom && this.validTo && this.validFrom > this.validTo) {
      result.push(`Holiday '${this.key}' has a validFrom gt validTo`);
    }
    return result;
  }
  // </editor-fold>
}
