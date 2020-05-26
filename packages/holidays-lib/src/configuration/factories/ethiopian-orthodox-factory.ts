import { ErrorKeys } from '../errors';
import { IEthiopianOrthodoxHoliday, EthiopianOrthodoxHoliday } from '../holidays';
import { HolidayStatus, CycleType } from '../types';
import { EthiopianOrthodoxHolidayType, EthiopianOrthodoxHolidayTypeKeyStrings } from '../types';
import { IBaseFactory, BaseFactory } from './base-factory';

export interface IEthiopianOrthodoxFactory extends IBaseFactory<IEthiopianOrthodoxHoliday, EthiopianOrthodoxHolidayType>{ }

export class EthiopianOrthodoxFactory extends BaseFactory<IEthiopianOrthodoxHoliday, EthiopianOrthodoxHolidayType> implements IEthiopianOrthodoxFactory {

  // <editor-fold desc='Constructor & C°'>
  public constructor() {
    super();
  }
  // </editor-fold>

  // <editor-fold desc='Abstract methods implementation'>
  protected createHoliday(
    key: EthiopianOrthodoxHolidayType, holidayStatus: HolidayStatus, cycleType: CycleType, validFrom: number, validTo: number): IEthiopianOrthodoxHoliday {
    return new EthiopianOrthodoxHoliday(
      key, holidayStatus, cycleType, validFrom, validTo);
  }

  protected extractData(obj: any): void {
    // nothing to do here
  }

  protected extractKey(obj: any): EthiopianOrthodoxHolidayType {
    const result = EthiopianOrthodoxHolidayType[<EthiopianOrthodoxHolidayTypeKeyStrings>obj.type];

    if (!result && result !== 0) {
      if (!obj.type) {
        this.addError(ErrorKeys.ETHIOPIAN_ORTHODOX_TYPE_MISSING);
      } else {
        this.addError(ErrorKeys.ETHIOPIAN_ORTHODOX_TYPE_INVALID, obj.type);
      }
    }
    return result;
  }
  // </editor-fold>

}
