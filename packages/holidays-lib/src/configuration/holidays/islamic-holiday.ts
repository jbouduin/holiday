import { Category, Cycle, HolidayType, IslamicHolidayType } from '../types';
import { IBaseHoliday, BaseHoliday } from './base-holiday';

export interface IIslamicHoliday extends IBaseHoliday<IslamicHolidayType> { }

export class IslamicHoliday extends BaseHoliday<IslamicHolidayType> implements IIslamicHoliday {

  // <editor-fold desc='Constructor & C°'>
  public constructor(
    key: IslamicHolidayType,
    category: Category,
    cycle: Cycle,
    validFrom: number,
    validTo: number) {

    super(HolidayType.ISLAMIC, key, category, cycle, validFrom, validTo);
  }
  // </editor-fold>

  // <editor-fold desc='Abstract method implementations'>
  public get stringKey(): string {
    return IslamicHolidayType[this.key];
  }

  public get translationKey(): string {
    return 'ISLAMIC.' + IslamicHolidayType[this.key];
  }
  // </editor-fold>
}
