import { ErrorKeys } from '../errors';
import { IFixedWeekdayHoliday, FixedWeekdayHoliday } from '../holidays';
import { IFixedWeekday } from '../specifics';
import { ChronologyType, ChronologyTypeKeyStrings} from '../types';
import { CycleType, HolidayStatus } from '../types';
import { IBaseFactory, BaseFactory } from './base-factory';

export interface IFixedWeekdayFactory extends IBaseFactory<IFixedWeekdayHoliday, string>{ }

export class FixedWeekdayFactory extends BaseFactory<IFixedWeekdayHoliday, string> implements IFixedWeekdayFactory {

  // <editor-fold desc='Private properties'>
  private fixedWeekday!: IFixedWeekday;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor() {
    super();
  }
  // </editor-fold>

  // <editor-fold desc='Abstract methods implementation'>
  protected createHoliday(
    key: string, holidayStatus: HolidayStatus, cycleType: CycleType, validFrom: number, validTo: number): IFixedWeekdayHoliday {
    return new FixedWeekdayHoliday(key, holidayStatus, cycleType, validFrom, validTo, this.fixedWeekday);
  }

  protected extractData(obj: any): void {
    this.fixedWeekday = this.dataExtractor.extractFixedWeekday(obj);
  }

  protected extractKey(obj: any): string {
    return this.dataExtractor.extractStringKey(obj);
  }
  // </editor-fold>

}
