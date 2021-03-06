import { IMove } from '../specifics';
import { Category, Cycle, HolidayType } from '../types';

export interface IBaseHoliday<T> {
  readonly key: T;
  readonly cycle: Cycle;
  readonly category: Category;
  readonly validFrom: number;
  readonly validTo: number;
  readonly stringKey: string;
  readonly translationKey: string;
  readonly holidayType: HolidayType;
  readonly moves: Array<IMove>;
}

export abstract class BaseHoliday<T> implements IBaseHoliday<T> {

  //#region Public static magic numbers
  // see http://ecma-international.org/ecma-262/5.1/#sec-15.9.1.1
  // undefined valid from is approx. the earliest date possible in JS
  public static undefinedValidFrom = new Date(-8640000000000000).getFullYear();
  // undefined valid from is approx. the latest date possible in JS
  public static undefinedValidTo = new Date(8640000000000000).getFullYear();
  //#endregion

  //#region IHoliday interface members
  public readonly holidayType: HolidayType;
  public readonly key: T
  public readonly validFrom: number;
  public readonly validTo: number;
  public readonly cycle!: Cycle;
  public readonly category!: Category;
  public readonly moves: Array<IMove>;
  //#endregion

  //#region Abstract methods
  public abstract get stringKey(): string;
  public abstract get translationKey(): string;
  //#endregion

  //#region Constructor & C°
  public constructor(
    holidayType: HolidayType,
    key: T,
    category: Category,
    cycle: Cycle,
    validFrom: number,
    validTo: number) {
    this.holidayType = holidayType;
    this.key = key;
    this.category = category;
    this.cycle = cycle;
    this.validFrom = validFrom;
    this.validTo = validTo;
    this.moves = new Array<IMove>();
  }
  //#endregion
}
