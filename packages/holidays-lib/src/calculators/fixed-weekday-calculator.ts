import { IFixedWeekdayHoliday, IFixedWeekday } from '../configuration';
import { IBaseCalculator, BaseCalculator } from './base-calculator';

export interface IFixedWeekdayCalculator extends IBaseCalculator<IFixedWeekdayHoliday>{ }

export class FixedWeekdayCalculator extends BaseCalculator<IFixedWeekdayHoliday> implements IFixedWeekdayCalculator {

  //#region Constructor
  public constructor() {
    super();
  }
  //#endregion

  //#region Abstract method implementation
  public calculateDate(holiday: IFixedWeekdayHoliday, year: number): Date | undefined
  {
    return this.calendarHelper.calculateFixedWeekday(holiday as IFixedWeekday, year);
  }
  //#endregion
}
