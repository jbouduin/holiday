import { IFixedWeekdayHoliday, Weekday, Which } from '../configuration';
import { IBaseCalculator, BaseCalculator } from './base-calculator';

export interface IFixedWeekdayCalculator extends IBaseCalculator<IFixedWeekdayHoliday>{ }

export class FixedWeekdayCalculator extends BaseCalculator<IFixedWeekdayHoliday> implements IFixedWeekdayCalculator {

  // <editor-fold desc='Constructor'>
  public constructor() {
    super();
  }
  // </editor-fold>

  // <editor-fold desc='Abstract method implementation'>
  public calculateDate(holiday: IFixedWeekdayHoliday, year: number): Date | undefined
  {
    if (!this.calendarHelper.occurs(holiday, year)) {
      return undefined;
    }

    if (holiday.which === Which.LAST)
    {
      const lastDayOfMonth = new Date(Date.UTC(year, holiday.month + 1, 0));
      const dayOfLastDayOfMonth = lastDayOfMonth.getDay();
      return this.calendarHelper.addDays(lastDayOfMonth, holiday.weekday - lastDayOfMonth.getDay());
    } else {
      const firstDayOfMonth = new Date(Date.UTC(year, holiday.month, 1));
      const dayOfFirstDayOfMonth = firstDayOfMonth.getDay();
      return this.calendarHelper.addDays(firstDayOfMonth,
        (dayOfFirstDayOfMonth > holiday.weekday ?
          holiday.weekday - dayOfFirstDayOfMonth + 7:
          holiday.weekday - dayOfFirstDayOfMonth) +
          holiday.which * 7
      );
    }
  }
  // </editor-fold>
}
