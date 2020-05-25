import { ErrorKeys } from '../errors';
import { IIslamicHoliday, IslamicHoliday } from '../holidays';
import { HolidayStatus, CycleType } from '../types';
import { IslamicHolidayType, IslamicHolidayTypeKeyStrings } from '../types';
import { IBaseFactory, BaseFactory } from './base-factory';

export interface IIslamicFactory extends IBaseFactory<IIslamicHoliday, IslamicHolidayType>{ }

export class IslamicFactory extends BaseFactory<IIslamicHoliday, IslamicHolidayType> implements IIslamicFactory {

  // <editor-fold desc='Constructor & C°'>
  public constructor() {
    super();
  }
  // </editor-fold>

  // <editor-fold desc='Abstract methods implementation'>
  protected createHoliday(
    key: IslamicHolidayType, holidayStatus: HolidayStatus, cycleType: CycleType, validFrom: number, validTo: number): IIslamicHoliday {
    return new IslamicHoliday(
      key, holidayStatus, cycleType, validFrom, validTo);
  }

  protected extractData(obj: any): void {
    // nothing to do here
  }

  protected extractKey(obj: any): IslamicHolidayType {
    const result = IslamicHolidayType[<IslamicHolidayTypeKeyStrings>obj.type];

    if (!result && result !== 0) {
      if (!obj.type) {
        this.addError(ErrorKeys.ISLAMIC_TYPE_MISSING);
      } else {
        this.addError(ErrorKeys.ISLAMIC_TYPE_INVALID, obj.type);
      }
    }
    return result;
  }
  // </editor-fold>

}
