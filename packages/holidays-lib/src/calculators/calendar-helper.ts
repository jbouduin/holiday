import { ChronologyType, CycleType } from '../configuration';
import { BaseHoliday, IBaseHoliday, IFixedDateHoliday } from '../configuration';

export interface ICalendarHelper {
  addDays(date: Date, days: number): Date;
  getEasternSunday(chronology: ChronologyType, year: number): Date;
  occurs(holiday: IBaseHoliday<any>, year: number): boolean;
}

export class CalendarHelper implements ICalendarHelper {

  // <editor-fold desc='Constructor & C°'>
  public constructor() { }
  // </editor-fold>

  // <editor-fold desc='ICalendar interface methods'>
  public addDays(date: Date, days: number): Date {
    return new Date(date.getTime() + (days * 1000 * 60 * 60 * 24));
  }

  public getEasternSunday(chronology: ChronologyType, year: number): Date {
    switch (chronology) {
      case ChronologyType.JULIAN: {
        // originally this checked on year >= 1583. Took it out.
        return this.getJulianEasternSunday(year);
      }
      case ChronologyType.GREGORIAN: {
        return this.getGregorianEasterSunday(year);
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
    // source: https://www.staff.science.uu.nl/~gent0113/easter/easter_text2a.htm
    const a = this.generalizedModulo(year, 19);
    const goldenNumber = a + 1;
    const b = this.generalizedModulo(year, 4);
    const c = this.generalizedModulo(year, 7);
    let d = this.generalizedModulo((19 * a + 15), 30);
    if ( goldenNumber === 1) {
      d++;
    }
    const e= this.generalizedModulo((2 * b + 4 * c - d + 6), 7);
    const fmj = 113 + d; // Easter full moon [days after -92 March]
    const dmj = fmj + e + 1; // Easter Sunday [days after -92 March]
    const fmmj = Math.floor(fmj / 31); // month Easter full moon [March = 3; April = 4]
    const fmdj = this.generalizedModulo(fmj , 31) + 1; // day Easter full moon
    const esmj = Math.floor(dmj / 31); // month Easter Sunday [March = 3; April = 4]
    const esdj = this.generalizedModulo(dmj, 31) + 1; // day Easter Sunday

    return this.addDays(new Date(Date.UTC(year, esmj === 3 ? 2 : 3, esdj)), 13);

  }

  private generalizedModulo(a: number, b: number): number {
    // generalized modulo function (m mod n) - also valid for negative values of m
    return (( a % b) + b) % b;
  }

  private getGregorianEasterSunday(year: number): Date {
    // original yollyday code
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
    return new Date(Date.UTC(year, month == 3 ? 2 : 3, day));
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
