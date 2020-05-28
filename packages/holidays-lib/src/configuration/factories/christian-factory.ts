import { ErrorKey } from '../errors';
import { IChristianHoliday, ChristianHoliday } from '../holidays';
import { ChronologyType, ChronologyTypeKeyStrings} from '../types';
import { ChristianHolidayType, ChristianHolidayTypeKeyStrings } from '../types';
import { CycleType, HolidayStatus } from '../types';
import { IBaseFactory, BaseFactory } from './base-factory';

export interface IChristianFactory extends IBaseFactory<IChristianHoliday, ChristianHolidayType>{ }

export class ChristianFactory extends BaseFactory<IChristianHoliday, ChristianHolidayType> implements IChristianFactory {

  // <editor-fold desc='Private properties'>
  private chronology: ChronologyType;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor() {
    super();
    this.chronology = ChronologyType.GREGORIAN;
  }
  // </editor-fold>

  // <editor-fold desc='Abstract methods implementation'>
  protected createHoliday(
    key: ChristianHolidayType, holidayStatus: HolidayStatus, cycleType: CycleType, validFrom: number, validTo: number): IChristianHoliday {
    return new ChristianHoliday(key, holidayStatus, cycleType, validFrom, validTo, this.chronology);
  }

  protected extractData(obj: any): void {
    if (obj.chronology) {
      this.chronology = ChronologyType[<ChronologyTypeKeyStrings>obj.chronology];
    } else {
      this.chronology = ChronologyType.GREGORIAN;
    }

    if (this.chronology === undefined) {
      this.addError(ErrorKey.CHRISTIAN_CHRONOLOGY_INVALID);
    }
  }

  protected extractKey(obj: any): ChristianHolidayType {
    const result = ChristianHolidayType[<ChristianHolidayTypeKeyStrings>obj.key];

    if (!result && result !== 0) {
      if (!obj.key) {
        this.addError(ErrorKey.CHRISTIAN_TYPE_MISSING);
      } else {
        this.addError(ErrorKey.CHRISTIAN_TYPE_INVALID, obj.key);
      }
    }
    return result;
  }
  // </editor-fold>

}
