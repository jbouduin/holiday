import { Category, Cycle, HolidayType, EthiopianOrthodoxHolidayType } from '../types';
import { IBaseHoliday, BaseHoliday } from './base-holiday';

export interface IEthiopianOrthodoxHoliday extends IBaseHoliday<EthiopianOrthodoxHolidayType> { }

export class EthiopianOrthodoxHoliday extends BaseHoliday<EthiopianOrthodoxHolidayType> implements IEthiopianOrthodoxHoliday {

  // <editor-fold desc='Constructor & C°'>
  public constructor(
    key: EthiopianOrthodoxHolidayType,
    category: Category,
    cycle: Cycle,
    validFrom: number,
    validTo: number) {
    super(HolidayType.ETHIOPIAN_ORTHODOX, key, category, cycle, validFrom, validTo);
  }
  // </editor-fold>

  // <editor-fold desc='Abstract method implementations'>
  public get stringKey(): string {
    return EthiopianOrthodoxHolidayType[this.key];
  }

  public get translationKey(): string {
    return 'ETHIOPIAN_ORTHODOX.' + EthiopianOrthodoxHolidayType[this.key];
  }
  // </editor-fold>
}
