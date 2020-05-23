import { ChronologyType, CycleType } from '../configuration';
import { BaseHoliday, IBaseHoliday, IFixedDateHoliday } from '../configuration';

export interface ICalendarHelper {
  getEasternSunday(chronology: ChronologyType, year: number): Date;
  occurs(holiday: IBaseHoliday<any>, year: number): boolean;
}

export class CalendarHelper implements ICalendarHelper {

  // <editor-fold desc='Constructor & C°'>
  public constructor() { }
  // </editor-fold>

  // <editor-fold desc='ICalendar interface methods'>
  public getEasternSunday(chronology: ChronologyType, year: number): Date {
    switch (chronology) {
      case ChronologyType.JULIAN: {
        // TODO check this year >0 1583
        return year >= 1583 ? this.getJulianEasternSunday(year) : this.getGregorianEasterSunday(year);
      }
      case ChronologyType.GREGORIAN: {
        return this.getGregorianEasterSunday(year);
      }
      default: {
        throw new Error('invalid chronology');
      }
    }
  }

  public occurs(holiday: IBaseHoliday<any>, year: number): boolean {
    const result = (holiday.validFrom === BaseHoliday.undefinedValidFrom || holiday.validFrom <= year ) &&
      (holiday.validTo === BaseHoliday.undefinedValidTo || holiday.validTo >= year) &&
      this.isValidForCyle(holiday, year);
    return result;
  }
  // </editor-fold>

  // <editor-fold desc='Private methods'>
  private getJulianEasternSunday(year: number): Date {
    // TODO: this is apparently wrong
    const a = year % 4;
    const b = year % 7;
    const century = year % 19;
    const d = (19 * century + 15) % 30;
    const e = (2 * a + 4 * b - d + 34) % 7;
    const x = d + e + 114;
    const month = Math.floor(x / 31);
    const day = (x % 31) + 1;
    return new Date(year, month === 3 ? 2 : 3, day);
  }

  private getGregorianEasterSunday(year: number): Date {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = b / 4;
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const j = c % 4;
    const k = (32 + 2 *e + 2 * i - h - j) % 7;
    const l = Math.floor((a + 11 * h + 22 * k) / 451);
    const x = h + k - 7 * l + 114;
    const month = Math.floor(x / 31);
    const day = (x % 31) + 1;
    return new Date(year, month == 3 ? 2 : 3, day);
  }

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
