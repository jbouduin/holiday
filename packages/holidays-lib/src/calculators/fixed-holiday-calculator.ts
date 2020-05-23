import { IFixedDateHoliday } from '../configuration';

import { ICalendarHelper, CalendarHelper } from './calendar-helper';

export interface IFixedHolidayCalculator {
  getFixedDateHoliday(holiday: IFixedDateHoliday, year: number): Date | undefined
}

export class FixedHolidayCalculator implements IFixedHolidayCalculator {

  // <editor-fold desc='Private properties'>
  private readonly calendarHelper: ICalendarHelper;
  // </editor-fold>

  // <editor-fold desc='Constructor'>
  public constructor() {
    this.calendarHelper = new CalendarHelper();
  }
  // </editor-fold>

  // <editor-fold desc='IFixedHolidayCalculator interface methods'>
  public getFixedDateHoliday(holiday: IFixedDateHoliday, year: number): Date | undefined
  {
    if (!this.calendarHelper.occurs(holiday, year)) {
      return undefined;
    }
    return new Date(year, holiday.month, holiday.day);
  }
  // </editor-fold>
}
