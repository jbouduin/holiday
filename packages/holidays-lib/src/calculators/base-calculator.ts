import { IBaseHoliday } from '../configuration';
import { ICalendarHelper, CalendarHelper } from './calendar-helper';
import { IMover, Mover } from './mover';

export interface IBaseCalculator<T extends IBaseHoliday<any>> {
  calculate(holiday: T, year: number): Date | undefined;
}

export abstract class BaseCalculator<T extends IBaseHoliday<any>> implements IBaseCalculator<IBaseHoliday<any>> {

  // <editor-fold desc='Protected properties'>
  protected readonly calendarHelper: ICalendarHelper;
  // </editor-fold>

  // <editor-fold desc='Private properties'>
  private mover: IMover;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor() {
    this.calendarHelper = new CalendarHelper();
    this.mover = new Mover(this.calendarHelper);
  }
  // </editor-fold>

  // <editor-fold desc='Private abstract methods'>
  public calculate(holiday: T, year: number): Date | undefined {
    if (!this.calendarHelper.occurs(holiday, year)) {
      return undefined;
    }
    let result: Date | undefined = this.calculateDate(holiday, year);
    if (result && holiday.moves.length > 0) {
      result = this.mover.moveDate(holiday.moves, result);
    }
    return result;
  }
  // </editor-fold>

  // <editor-fold desc='Abstract methods'>
  public abstract calculateDate(holiday: T, year: number): Date | undefined;
  // </editor-fold>
}
