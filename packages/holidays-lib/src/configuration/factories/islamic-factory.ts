import { ErrorKey } from '../errors';
import { IIslamicHoliday, IslamicHoliday } from '../holidays';
import { Category, Cycle } from '../types';
import { IslamicHolidayType, IslamicHolidayTypeKeyStrings } from '../types';
import { IBaseFactory, BaseFactory } from './base-factory';

export interface IIslamicFactory extends IBaseFactory<IIslamicHoliday, IslamicHolidayType>{ }

export class IslamicFactory extends BaseFactory<IIslamicHoliday, IslamicHolidayType> implements IIslamicFactory {

  //#region Constructor & C°
  public constructor() {
    super();
  }
  //#endregion

  //#region Abstract methods implementation
  protected createHoliday(
    key: IslamicHolidayType, category: Category, cycle: Cycle, validFrom: number, validTo: number): IIslamicHoliday {
    return new IslamicHoliday(
      key, category, cycle, validFrom, validTo);
  }

  protected extractData(obj: any): void {
    // nothing to do here
  }

  protected extractKey(obj: any): IslamicHolidayType {
    const result = IslamicHolidayType[<IslamicHolidayTypeKeyStrings>obj.key];

    if (!result && result !== 0) {
      if (!obj.key) {
        this.addError(ErrorKey.ISLAMIC_TYPE_MISSING);
      } else {
        this.addError(ErrorKey.ISLAMIC_TYPE_INVALID, obj.key);
      }
    }
    return result;
  }
  //#endregion

}
