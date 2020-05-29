import { IFixedWeekdayHoliday, IFixedWeekday } from '../configuration';
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
    return this.calendarHelper.calculateFixedWeekday(holiday as IFixedWeekday, year);
  }
  // </editor-fold>
}
