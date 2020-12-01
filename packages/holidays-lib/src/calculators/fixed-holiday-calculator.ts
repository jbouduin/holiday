import { IFixedDate, IFixedDateHoliday } from '../configuration';
import { IBaseCalculator, BaseCalculator } from './base-calculator';

export interface IFixedHolidayCalculator extends IBaseCalculator<IFixedDateHoliday>{ }

export class FixedHolidayCalculator extends BaseCalculator<IFixedDateHoliday> implements IFixedHolidayCalculator {

  //#region Constructor
  public constructor() {
    super();
  }
  //#endregion

  //#region Abstract method implementation
  public calculateDate(holiday: IFixedDateHoliday, year: number): Date | undefined
  {
    return this.calendarHelper.calculateFixedDate(holiday as IFixedDate, year);
  }
  //#endregion
}
