import { IFixedHoliday } from './holidays/fixed-holiday';
import { IChristianHoliday } from './holidays/christian-holiday';

export interface IHolidayCollection {
  christianHolidays: Array<IChristianHoliday>;
  fixedHolidays: Array<IFixedHoliday>;
}

export class HolidayCollection implements IHolidayCollection {
  public christianHolidays: Array<IChristianHoliday>;
  public fixedHolidays: Array<IFixedHoliday>;

  public constructor() {
    this.christianHolidays = new Array<IChristianHoliday>();
    this.fixedHolidays = new Array<IFixedHoliday>();
  }
}
