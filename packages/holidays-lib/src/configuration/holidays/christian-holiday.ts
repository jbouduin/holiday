import { ChristianHolidayType, ChronologyType, HolidayType } from '../types';
import { IBaseHoliday, BaseHoliday } from './base-holiday';

export interface IChristianHoliday extends IBaseHoliday<ChristianHolidayType> {
  chronology: ChronologyType;
}

export class ChristianHoliday extends BaseHoliday<ChristianHolidayType> implements IChristianHoliday {

  // <editor-fold desc='IChristianHoliday interface properties'>
  public chronology: ChronologyType;
  // </editor-fold>


  // <editor-fold desc='Constructor'>
  public constructor(key: ChristianHolidayType) {
    super(HolidayType.CHRISTIAN, key);
    this.chronology = ChronologyType.GREGORIAN;
  }
  // </editor-fold>

  // <editor-fold desc='Baseclass methods override'>
  public validate(): Array<string> {
    const result = super.validate();
    if (this.chronology === undefined) {
      result.push(`Fixed holiday '${this.key}' has no valid chronology`);
    }
    return result;
  }
  // </editor-fold>

  // <editor-fold desc='Abstract method implementations'>
  public get translationKey(): string {
    return ChristianHolidayType[this.key];
  }
  // </editor-fold>
}
