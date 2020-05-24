import { EthiopianOrthodoxHolidayType } from './ethiopian-orthodox-holiday-type';
import { IBaseHoliday, BaseHoliday } from './base-holiday';
import { HolidayType } from './holiday-type';
import { CycleType }  from './cycle-type';
import { HolidayStatus } from './holiday-status';

export interface IEthiopianOrthodoxHoliday extends IBaseHoliday<EthiopianOrthodoxHolidayType> { }

export class EthiopianOrthodoxHoliday extends BaseHoliday<EthiopianOrthodoxHolidayType> implements IEthiopianOrthodoxHoliday {

  // <editor-fold desc='Constructor & C°'>
  public constructor(key: EthiopianOrthodoxHolidayType) {
    super(HolidayType.ETHIOPIAN_ORTHODOX, key);
  }
  // </editor-fold>

  // <editor-fold desc='Abstract method implementations'>
  public get translationKey(): string {
    return EthiopianOrthodoxHolidayType[this.key];
  }
  // </editor-fold>
}
