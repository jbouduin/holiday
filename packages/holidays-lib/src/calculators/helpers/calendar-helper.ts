import { Cycle } from '../../configuration';
import { Which } from '../../configuration';
import { BaseHoliday, IBaseHoliday, IFixedDate, IFixedWeekday } from '../../configuration';

export interface ICalendarHelper {
  addDays(date: Date, days: number): Date;
  calculateFixedDate(fix: IFixedDate, year: number): Date;
  calculateFixedWeekday(fix: IFixedWeekday, year: number): Date;
  generalizedModulo(a: number, b: number): number;
  occurs(holiday: IBaseHoliday<any>, year: number): boolean;
}

export class CalendarHelper implements ICalendarHelper {

  //#region Constructor & C°
  public constructor() { }
  //#endregion

  //#region ICalendar interface methods
  public addDays(date: Date, days: number): Date {
    return new Date(date.getTime() + (days * 1000 * 60 * 60 * 24));
  }

  public calculateFixedDate(fix: IFixedDate, year: number): Date {
    return new Date(Date.UTC(year, fix.month, fix.day));
  }

  public calculateFixedWeekday(fix: IFixedWeekday, year: number): Date {
    if (fix.which === Which.LAST)
    {
      const lastDayOfMonth = new Date(Date.UTC(year, fix.month + 1, 0));
      return this.addDays(lastDayOfMonth, fix.weekday - lastDayOfMonth.getDay());
    } else {
      const firstDayOfMonth = new Date(Date.UTC(year, fix.month, 1));
      const dayOfFirstDayOfMonth = firstDayOfMonth.getDay();
      return this.addDays(firstDayOfMonth,
        (dayOfFirstDayOfMonth > fix.weekday ?
          fix.weekday - dayOfFirstDayOfMonth + 7:
          fix.weekday - dayOfFirstDayOfMonth) +
          fix.which * 7
      );
    }
  }

  public generalizedModulo(a: number, b: number): number {
    // generalized modulo function (m mod n) - also valid for negative values of m
    return (( a % b) + b) % b;
  }

  public occurs(holiday: IBaseHoliday<any>, year: number): boolean {
    const result = (holiday.validFrom === BaseHoliday.undefinedValidFrom || holiday.validFrom <= year ) &&
      (holiday.validTo === BaseHoliday.undefinedValidTo || holiday.validTo >= year) &&
      this.isValidForCyle(holiday, year);
    return result;
  }
  //#endregion

  //#region Private methods
  private isValidForCyle(holiday: IBaseHoliday<any>, year: number): boolean
  {
    let cycleYears = 1;
    switch (holiday.cycle) {
      case Cycle.EVERY_YEAR: {
        return true;
      }
      case Cycle.ODD_YEARS: {
        return year % 2 !== 0;
      }
      case Cycle.EVEN_YEARS: {
        return year % 2 === 0;
      }
      case Cycle.TWO_YEARS: {
        cycleYears = 2;
        break;
      }
      case Cycle.FOUR_YEARS: {
        cycleYears = 4;
        break;
      }
      case Cycle.FIVE_YEARS: {
        cycleYears = 5;
        break;
      }
      case Cycle.SIX_YEARS: {
        cycleYears = 6;
        break;
      }
    }
    return (year - holiday.validFrom) % cycleYears === 0;
  }
  //#endregion
}
