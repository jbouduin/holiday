import { IFixedDate, IFixedDateHoliday } from '../configuration';
import { IBaseCalculator, BaseCalculator } from './base-calculator';

export interface IFixedHolidayCalculator extends IBaseCalculator<IFixedDateHoliday>{ }

export class FixedHolidayCalculator extends BaseCalculator<IFixedDateHoliday> implements IFixedHolidayCalculator {

  // <editor-fold desc='Constructor'>
  public constructor() {
    super();
  }
  // </editor-fold>

  // <editor-fold desc='Abstract method implementation'>
  public calculateDate(holiday: IFixedDateHoliday, year: number): Date | undefined
  {
    return this.calendarHelper.calculateFixedDate(holiday as IFixedDate, year);
  }
  // </editor-fold>
}
