import { Category, ChronologyType, Cycle, HolidayType, ChristianHolidayType } from '../types';
import { IBaseHoliday, BaseHoliday } from './base-holiday';

export interface IChristianHoliday extends IBaseHoliday<ChristianHolidayType> {
  chronology: ChronologyType;
}

export class ChristianHoliday extends BaseHoliday<ChristianHolidayType> implements IChristianHoliday {

  //#region IChristianHoliday interface properties
  public chronology: ChronologyType;
  //#endregion

  //#region Constructor
  public constructor(
    key: ChristianHolidayType,
    category: Category,
    cycle: Cycle,
    validFrom: number,
    validTo: number,
    chronology: ChronologyType) {
    super(HolidayType.CHRISTIAN, key, category, cycle, validFrom, validTo);
    this.chronology = chronology;
  }
  //#endregion

  //#region Abstract method implementations
  public get stringKey(): string {
    return ChristianHolidayType[this.key];
  }

  public get translationKey(): string {
    return 'CHRISTIAN.' + ChristianHolidayType[this.key];
  }
  //#endregion
}
