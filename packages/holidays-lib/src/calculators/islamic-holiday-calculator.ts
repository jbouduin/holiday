import { IIslamicHoliday, IslamicHolidayType } from '../configuration';
import { IBaseCalculator, BaseCalculator } from './base-calculator';

export interface IIslamicHolidayCalculator extends IBaseCalculator<IIslamicHoliday>{ }

export class IslamicHolidayCalculator extends BaseCalculator<IIslamicHoliday> implements IIslamicHolidayCalculator {

  //#region Constructor
  public constructor() {
    super();
  }
  //#endregion

  //#region Abstract method implementation
  public calculateDate(holiday: IIslamicHoliday, year: number): Date | undefined
  {
    return undefined;
    // calculate hijri date of january, 1.
    // calculate hijri date of december, 31
    // calculate the hijri date of the requested holiday for both years
    // convert them to gregorian calender and return the one that suits the requested year

  }
  //#endregion
}
