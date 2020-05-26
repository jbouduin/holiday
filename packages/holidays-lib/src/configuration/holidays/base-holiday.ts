import { IMovingCondition } from '../specifics';
import { CycleType, HolidayStatus, HolidayType } from '../types';

export interface IBaseHoliday<T> {
  readonly key: T;
  readonly cycleType: CycleType;
  readonly holidayStatus: HolidayStatus;
  readonly validFrom: number;
  readonly validTo: number;
  readonly translationKey: string;
  readonly holidayType: HolidayType;
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
  public readonly validFrom: number;
  public readonly validTo: number;
  public readonly cycleType!: CycleType;
  public readonly holidayStatus!: HolidayStatus;
  public readonly movingConditions: Array<IMovingCondition>;
  // </editor-fold>

  // <editor-fold desc='Abstract methods'>
  public abstract get translationKey(): string;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor(
    holidayType: HolidayType,
    key: T,
    holidayStatus: HolidayStatus,
    cycleType: CycleType,
    validFrom: number,
    validTo: number) {
    this.holidayType = holidayType;
    this.key = key;
    this.holidayStatus = holidayStatus;
    this.cycleType = cycleType;
    this.validFrom = validFrom;
    this.validTo = validTo;
    this.movingConditions = new Array<IMovingCondition>();
  }
  // </editor-fold>
}
