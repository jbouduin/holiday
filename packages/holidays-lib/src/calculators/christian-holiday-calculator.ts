import { IChristianHoliday, ChristianHolidayType } from '../configuration';
import { IBaseCalculator, BaseCalculator } from './base-calculator';

export interface IChristianHolidayCalculator extends IBaseCalculator<IChristianHoliday>{ }

export class ChristianHolidayCalculator extends BaseCalculator<IChristianHoliday> implements IChristianHolidayCalculator {

  // <editor-fold desc='Constructor'>
  public constructor() {
    super();
  }
  // </editor-fold>

  // <editor-fold desc='Abstract method implementation'>
  public calculateDate(holiday: IChristianHoliday, year: number): Date | undefined
  {
    const easternSunday = this.calendarHelper.getEasternSunday(holiday.chronology, year);
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
  // </editor-fold>
}
