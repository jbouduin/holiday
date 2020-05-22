import { IslamicHolidayType } from './islamic-holiday-type';
import { IBaseHoliday, BaseHoliday } from './base-holiday';
import { HolidayType } from './holiday-type';

export interface IIslamicHoliday extends IBaseHoliday<IslamicHolidayType> { }

export class IslamicHoliday extends BaseHoliday<IslamicHolidayType> implements IIslamicHoliday {

  // <editor-fold desc='Constructor & C°'>
  public constructor(key: IslamicHolidayType) {
    super(HolidayType.ISLAMIC, key);
  }
  // </editor-fold>

  // <editor-fold desc='Abstract method implementations'>
  public get translationKey(): string {
    return IslamicHolidayType[this.key];
  }
  // </editor-fold>
}
