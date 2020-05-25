import { EthiopianOrthodoxHolidayType, HolidayType } from '../types';
import { IBaseHoliday, BaseHoliday } from './base-holiday';

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
