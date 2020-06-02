import { Category, ChronologyType, Cycle, HolidayType, ChristianHolidayType } from '../types';
import { IBaseHoliday, BaseHoliday } from './base-holiday';

export interface IChristianHoliday extends IBaseHoliday<ChristianHolidayType> {
  chronology: ChronologyType;
}

export class ChristianHoliday extends BaseHoliday<ChristianHolidayType> implements IChristianHoliday {

  // <editor-fold desc='IChristianHoliday interface properties'>
  public chronology: ChronologyType;
  // </editor-fold>

  // <editor-fold desc='Constructor'>
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
  // </editor-fold>

  // <editor-fold desc='Abstract method implementations'>
  public get translationKey(): string {
    return 'CHRISTIAN.' + ChristianHolidayType[this.key];
  }
  // </editor-fold>
}
