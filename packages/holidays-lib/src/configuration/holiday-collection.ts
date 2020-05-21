import { IChristianHoliday } from './holidays/christian-holiday';
import { IEthiopianOrthodoxHoliday } from './holidays/ethiopian-orthodox-holiday';
import { IFixedHoliday } from './holidays/fixed-holiday';
import { IIslamicHoliday } from './holidays/islamic-holiday';

export interface IHolidayCollection {
  christianHolidays: Array<IChristianHoliday>;
  ethiopianOrthodoxHolidays: Array<IEthiopianOrthodoxHoliday>;
  fixedHolidays: Array<IFixedHoliday>;
  islamicHolidays: Array<IIslamicHoliday>;
}

export class HolidayCollection implements IHolidayCollection {

  // <editor-fold desc='IHolidayCollection interface members'>
  public christianHolidays: Array<IChristianHoliday>;
  public ethiopianOrthodoxHolidays: Array<IEthiopianOrthodoxHoliday>
  public fixedHolidays: Array<IFixedHoliday>;
  public islamicHolidays: Array<IIslamicHoliday>;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor() {
    this.christianHolidays = new Array<IChristianHoliday>();
    this.ethiopianOrthodoxHolidays= new Array<IEthiopianOrthodoxHoliday>();
    this.fixedHolidays = new Array<IFixedHoliday>();
    this.islamicHolidays = new Array<IIslamicHoliday>();
  }
  // </editor-fold>
}
