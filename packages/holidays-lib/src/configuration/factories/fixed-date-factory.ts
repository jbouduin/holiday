import { IFixedDateHoliday, FixedDateHoliday } from '../holidays';
import { ErrorKeys } from '../errors';
import { IFixedDate } from '../specifics';
import { HolidayStatus, CycleType } from '../types';
import { IBaseFactory, BaseFactory } from './base-factory';

export interface IFixedDateFactory extends IBaseFactory<IFixedDateHoliday, string>{ }

export class FixedDateFactory extends BaseFactory<IFixedDateHoliday, string> implements IFixedDateFactory {

  // <editor-fold desc='Private properties'>
  private fixedDate!: IFixedDate;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor() {
    super();
  }
  // </editor-fold>

  // <editor-fold desc='Abstract methods implementation'>
  protected createHoliday(
    key: string, holidayStatus: HolidayStatus, cycleType: CycleType, validFrom: number, validTo: number): IFixedDateHoliday {
    return new FixedDateHoliday(
      key, holidayStatus, cycleType, validFrom, validTo, this.fixedDate.month, this.fixedDate.day);
  }

  protected extractData(obj: any): void {
    this.fixedDate = this.extractFixedDate(obj);
  }

  protected extractKey(obj: any): string {
    const result = obj.key;
    if (!result) {
      this.addError(ErrorKeys.KEY_MISSING);
    }
    return result;
  }
  // </editor-fold>

}
