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
  public calculate(holiday: IChristianHoliday, year: number): Date | undefined
  {
    if (!this.calendarHelper.occurs(holiday, year)) {
      return undefined;
    }
    const easternSunday = this.calendarHelper.getEasternSunday(holiday.chronology, year);
    switch (holiday.key) {
      // case ChristianHolidayType.GOOD_FRIDAY:
      //     return _calendarService.MoveDate(christianHoliday, easternSunday.AddDays(-2));
      // case ChristianHolidayType.EASTER_MONDAY:
      //     return _calendarService.MoveDate(christianHoliday, easternSunday.AddDays(1));
      // case ChristianHolidayType.ASCENSION_DAY:
      //     return _calendarService.MoveDate(christianHoliday, easternSunday.AddDays(39));
      // case ChristianHolidayType.WHIT_MONDAY:
      // case ChristianHolidayType.PENTECOST_MONDAY:
      //     return _calendarService.MoveDate(christianHoliday, easternSunday.AddDays(50));
      // case ChristianHolidayType.CORPUS_CHRISTI:
      //     return _calendarService.MoveDate(christianHoliday, easternSunday.AddDays(60));
      // case ChristianHolidayType.MAUNDY_THURSDAY:
      //     return _calendarService.MoveDate(christianHoliday, easternSunday.AddDays(-3));
      // case ChristianHolidayType.ASH_WEDNESDAY:
      //     return _calendarService.MoveDate(christianHoliday, easternSunday.AddDays(-46));
      // case ChristianHolidayType.GENERAL_PRAYER_DAY:
      //     return _calendarService.MoveDate(christianHoliday, easternSunday.AddDays(26));
      // case ChristianHolidayType.CLEAN_MONDAY:
      // case ChristianHolidayType.SHROVE_MONDAY:
      //     return _calendarService.MoveDate(christianHoliday, easternSunday.AddDays(-48));
      // case ChristianHolidayType.WHIT_SUNDAY:
      // case ChristianHolidayType.PENTECOST:
      //     return _calendarService.MoveDate(christianHoliday, easternSunday.AddDays(49));
      // case ChristianHolidayType.MARDI_GRAS:
      // case ChristianHolidayType.CARNIVAL:
      //     return _calendarService.MoveDate(christianHoliday, easternSunday.AddDays(-47));
      // case ChristianHolidayType.EASTER_SATURDAY:
      //     return _calendarService.MoveDate(christianHoliday, easternSunday.AddDays(-1));
      // case ChristianHolidayType.EASTER_TUESDAY:
      //     return _calendarService.MoveDate(christianHoliday, easternSunday.AddDays(2));
      // case ChristianHolidayType.SACRED_HEART:
      //     return _calendarService.MoveDate(christianHoliday, easternSunday.AddDays(68));
      case ChristianHolidayType.EASTER: {
        return easternSunday;
      }
      default: {
        return undefined;
      }
    }
  }
  // </editor-fold>
}
