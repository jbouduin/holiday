import { IChristianHoliday, ChristianHolidayType, ChronologyType } from '../configuration';
import { IBaseCalculator, BaseCalculator } from './base-calculator';

export interface IChristianHolidayCalculator extends IBaseCalculator<IChristianHoliday>{
  getEasternSunday(chronology: ChronologyType, year: number): Date;
}

export class ChristianHolidayCalculator extends BaseCalculator<IChristianHoliday> implements IChristianHolidayCalculator {

  //#region Constructor
  public constructor() {
    super();
  }
  //#endregion

  //#region Abstract method implementation
  public calculateDate(holiday: IChristianHoliday, year: number): Date | undefined {
    const easternSunday = this.getEasternSunday(holiday.chronology, year);
    switch (holiday.key) {
      case ChristianHolidayType.CLEAN_MONDAY:
      case ChristianHolidayType.SHROVE_MONDAY: {
        return this.calendarHelper.addDays(easternSunday, -48);
      }
      case ChristianHolidayType.MARDI_GRAS:
      case ChristianHolidayType.CARNIVAL: {
        return this.calendarHelper.addDays(easternSunday, -47);
      }
      case ChristianHolidayType.ASH_WEDNESDAY: {
        return this.calendarHelper.addDays(easternSunday, -46);
      }
      case ChristianHolidayType.MAUNDY_THURSDAY: {
        return this.calendarHelper.addDays(easternSunday, -3);
      }
      case ChristianHolidayType.GOOD_FRIDAY: {
        return this.calendarHelper.addDays(easternSunday, -2);
      }
      case ChristianHolidayType.EASTER_SATURDAY: {
        return this.calendarHelper.addDays(easternSunday, -1);
      }
      case ChristianHolidayType.EASTER: {
        return easternSunday;
      }
      case ChristianHolidayType.EASTER_MONDAY: {
        return this.calendarHelper.addDays(easternSunday, 1);
      }
      case ChristianHolidayType.EASTER_TUESDAY: {
        return this.calendarHelper.addDays(easternSunday, 2);
      }
      case ChristianHolidayType.GENERAL_PRAYER_DAY: {
        return this.calendarHelper.addDays(easternSunday, 26);
      }
      case ChristianHolidayType.ASCENSION_DAY:
        return this.calendarHelper.addDays(easternSunday, 39);
      case ChristianHolidayType.WHIT_SUNDAY:
      case ChristianHolidayType.PENTECOST: {
        return this.calendarHelper.addDays(easternSunday, 49);
      }
      case ChristianHolidayType.WHIT_MONDAY:
      case ChristianHolidayType.PENTECOST_MONDAY: {
        return this.calendarHelper.addDays(easternSunday, 50);
      }
      case ChristianHolidayType.CORPUS_CHRISTI: {
        return this.calendarHelper.addDays(easternSunday, 60);
      }
      case ChristianHolidayType.SACRED_HEART: {
          return this.calendarHelper.addDays(easternSunday, 68);
      }
    }
  }
  //#endregion

  //#region IChristianHolidayCalculator interface methods
  public getEasternSunday(chronology: ChronologyType, year: number): Date {
    switch (chronology) {
      case ChronologyType.JULIAN: {
        // TODO: originally this checked on the year <= 1583. Took it out.
        return this.getJulianEasternSunday(year);
      }
      case ChronologyType.GREGORIAN: {
        return this.getGregorianEasterSunday(year);
      }
    }
  }
  //#endregion

  //#region Private methods
  private getJulianEasternSunday(year: number): Date {
    // source: https://www.staff.science.uu.nl/~gent0113/easter/easter_text2a.htm
    const a = this.calendarHelper.generalizedModulo (year, 19);
    const goldenNumber = a + 1;
    const b = this.calendarHelper.generalizedModulo (year, 4);
    const c = this.calendarHelper.generalizedModulo (year, 7);
    let d = this.calendarHelper.generalizedModulo ((19 * a + 15), 30);
    if (goldenNumber === 1) {
      d++;
    }
    const e= this.calendarHelper.generalizedModulo ((2 * b + 4 * c - d + 6), 7);
    const fmj = 113 + d; // Easter full moon [days after -92 March]
    const dmj = fmj + e + 1; // Easter Sunday [days after -92 March]
    const esmj = Math.floor(dmj / 31); // month Easter Sunday [March = 3; April = 4]
    const esdj = this.calendarHelper.generalizedModulo (dmj, 31) + 1; // day Easter Sunday

    return this.calendarHelper.addDays(new Date(Date.UTC(year, esmj === 3 ? 2 : 3, esdj)), 13);
  }

  private getGregorianEasterSunday(year: number): Date {
    // adapted jollyday code
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
    return new Date(Date.UTC(year, month === 3 ? 2 : 3, day));
  }
  //#endregion
}
