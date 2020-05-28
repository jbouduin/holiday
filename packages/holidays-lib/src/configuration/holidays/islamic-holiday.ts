import { Category, CycleType, HolidayType, IslamicHolidayType } from '../types';
import { IBaseHoliday, BaseHoliday } from './base-holiday';

export interface IIslamicHoliday extends IBaseHoliday<IslamicHolidayType> { }

export class IslamicHoliday extends BaseHoliday<IslamicHolidayType> implements IIslamicHoliday {

  // <editor-fold desc='Constructor & C°'>
  public constructor(
    key: IslamicHolidayType,
    category: Category,
    cycle: CycleType,
    validFrom: number,
    validTo: number) {

    super(HolidayType.ISLAMIC, key, category, cycle, validFrom, validTo);
  }
  // </editor-fold>

  // <editor-fold desc='Abstract method implementations'>
  public get translationKey(): string {
    return IslamicHolidayType[this.key];
  }
  // </editor-fold>
}
