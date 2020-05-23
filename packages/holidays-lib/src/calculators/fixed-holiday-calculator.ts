import { IFixedDateHoliday } from '../configuration';
import { IBaseCalculator, BaseCalculator } from './base-calculator';

export interface IFixedHolidayCalculator extends IBaseCalculator<IFixedDateHoliday>{ }

export class FixedHolidayCalculator extends BaseCalculator<IFixedDateHoliday> implements IFixedHolidayCalculator {

  // <editor-fold desc='Constructor'>
  public constructor() {
    super();
  }
  // </editor-fold>

  // <editor-fold desc='Abstract method implementation'>
  public calculate(holiday: IFixedDateHoliday, year: number): Date | undefined
  {
    if (!this.calendarHelper.occurs(holiday, year)) {
      return undefined;
    }
    return new Date(Date.UTC(year, holiday.month, holiday.day));
  }
  // </editor-fold>
}
