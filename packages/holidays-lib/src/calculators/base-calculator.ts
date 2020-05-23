import { IBaseHoliday } from '../configuration';
import { ICalendarHelper, CalendarHelper } from './calendar-helper';

export interface IBaseCalculator<T extends IBaseHoliday<any>> {
  calculate(holiday: T, year: number): Date | undefined;
}

export abstract class BaseCalculator<T extends IBaseHoliday<any>> implements IBaseCalculator<IBaseHoliday<any>> {

  // <editor-fold desc='Protected properties'>
  protected readonly calendarHelper: ICalendarHelper;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor() {
    this.calendarHelper = new CalendarHelper();
  }
  // </editor-fold>

  // <editor-fold desc='Abstract methods'>
  public abstract calculate(holiday: T, year: number): Date | undefined;
  // </editor-fold>
}
