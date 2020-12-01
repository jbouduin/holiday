import { ErrorKey } from '../errors';
import { IEthiopianOrthodoxHoliday, EthiopianOrthodoxHoliday } from '../holidays';
import { Category, Cycle } from '../types';
import { EthiopianOrthodoxHolidayType, EthiopianOrthodoxHolidayTypeKeyStrings } from '../types';
import { IBaseFactory, BaseFactory } from './base-factory';

export interface IEthiopianOrthodoxFactory extends IBaseFactory<IEthiopianOrthodoxHoliday, EthiopianOrthodoxHolidayType>{ }

export class EthiopianOrthodoxFactory
  extends BaseFactory<IEthiopianOrthodoxHoliday, EthiopianOrthodoxHolidayType>
  implements IEthiopianOrthodoxFactory {

  //#region Constructor & C°
  public constructor() {
    super();
  }
  //#endregion

  //#region Abstract methods implementation
  protected createHoliday(
    key: EthiopianOrthodoxHolidayType,
    category: Category,
    cycle: Cycle,
    validFrom: number,
    validTo: number): IEthiopianOrthodoxHoliday {

    return new EthiopianOrthodoxHoliday(key, category, cycle, validFrom, validTo);
  }

  protected extractData(obj: any): void {
    // nothing to do here
  }

  protected extractKey(obj: any): EthiopianOrthodoxHolidayType {
    const result = EthiopianOrthodoxHolidayType[<EthiopianOrthodoxHolidayTypeKeyStrings>obj.key];

    if (!result && result !== 0) {
      if (!obj.key) {
        this.addError(ErrorKey.ETHIOPIAN_ORTHODOX_TYPE_MISSING);
      } else {
        this.addError(ErrorKey.ETHIOPIAN_ORTHODOX_TYPE_INVALID, obj.key);
      }
    }
    return result;
  }
  //#endregion

}
