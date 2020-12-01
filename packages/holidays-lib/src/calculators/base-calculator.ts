import { IBaseHoliday } from '../configuration';
import { ICalendarHelper, CalendarHelper } from './helpers';
import { IMover, Mover } from './helpers';

export interface IBaseCalculator<T extends IBaseHoliday<any>> {
  calculate(holiday: T, year: number): Date | undefined;
}

export abstract class BaseCalculator<T extends IBaseHoliday<any>> implements IBaseCalculator<IBaseHoliday<any>> {

  //#region Protected properties
  protected readonly calendarHelper: ICalendarHelper;
  //#endregion

  //#region Private properties
  private mover: IMover;
  //#endregion

  //#region Constructor & C°
  public constructor() {
    this.calendarHelper = new CalendarHelper();
    this.mover = new Mover(this.calendarHelper);
  }
  //#endregion

  //#region Private abstract methods
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
  //#endregion

  //#region Abstract methods
  public abstract calculateDate(holiday: T, year: number): Date | undefined;
  //#endregion
}
