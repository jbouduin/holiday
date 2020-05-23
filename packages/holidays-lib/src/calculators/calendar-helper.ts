import { CycleType } from '../configuration';
import { BaseHoliday, IBaseHoliday, IFixedDateHoliday } from '../configuration';

export interface ICalendarHelper {
  occurs(holiday: IBaseHoliday<any>, year: number): boolean;
}

export class CalendarHelper implements ICalendarHelper {

  // <editor-fold desc='Constructor & C°'>
  public constructor() { }
  // </editor-fold>

  // <editor-fold desc='ICalendar interface methods'>
  public occurs(holiday: IBaseHoliday<any>, year: number): boolean {
    const result = (holiday.validFrom === BaseHoliday.undefinedValidFrom || holiday.validFrom <= year ) &&
      (holiday.validTo === BaseHoliday.undefinedValidTo || holiday.validTo >= year) &&
      this.isValidForCyle(holiday, year);
    return result;
  }
  // </editor-fold>

  // <editor-fold desc='Private methods'>
  private isValidForCyle(holiday: IBaseHoliday<any>, year: number): boolean
  {
    let cycleYears = 1;
    switch (holiday.cycleType) {
      case CycleType.EVERY_YEAR: {
        return true;
      }
      case CycleType.ODD_YEARS: {
        return year % 2 !== 0;
      }
      case CycleType.EVEN_YEARS: {
        return year % 2 === 0;
      }
      case CycleType.TWO_YEARS: {
        cycleYears = 2;
        break;
      }
      case CycleType.FOUR_YEARS: {
        cycleYears = 4;
        break;
      }
      case CycleType.FIVE_YEARS: {
        cycleYears = 5;
        break;
      }
      case CycleType.SIX_YEARS: {
        cycleYears = 6;
        break;
      }
    }
    return holiday.validFrom === BaseHoliday.undefinedValidFrom ?
      false :
      (year - holiday.validFrom) % cycleYears === 0;
  }
  // </editor-fold>
}
