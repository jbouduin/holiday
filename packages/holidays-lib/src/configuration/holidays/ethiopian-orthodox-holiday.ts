import { Category, CycleType, HolidayType, EthiopianOrthodoxHolidayType } from '../types';
import { IBaseHoliday, BaseHoliday } from './base-holiday';

export interface IEthiopianOrthodoxHoliday extends IBaseHoliday<EthiopianOrthodoxHolidayType> { }

export class EthiopianOrthodoxHoliday extends BaseHoliday<EthiopianOrthodoxHolidayType> implements IEthiopianOrthodoxHoliday {

  // <editor-fold desc='Constructor & C°'>
  public constructor(
    key: EthiopianOrthodoxHolidayType,
    category: Category,
    cycle: CycleType,
    validFrom: number,
    validTo: number) {
    super(HolidayType.ETHIOPIAN_ORTHODOX, key, category, cycle, validFrom, validTo);
  }
  // </editor-fold>

  // <editor-fold desc='Abstract method implementations'>
  public get translationKey(): string {
    return EthiopianOrthodoxHolidayType[this.key];
  }
  // </editor-fold>
}
