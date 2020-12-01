import { ErrorKey } from '../errors';
import { IFixedWeekdayHoliday, FixedWeekdayHoliday } from '../holidays';
import { IFixedWeekday } from '../specifics';
import { ChronologyType, ChronologyTypeKeyStrings} from '../types';
import { Category, Cycle } from '../types';
import { IBaseFactory, BaseFactory } from './base-factory';

export interface IFixedWeekdayFactory extends IBaseFactory<IFixedWeekdayHoliday, string>{ }

export class FixedWeekdayFactory extends BaseFactory<IFixedWeekdayHoliday, string> implements IFixedWeekdayFactory {

  //#region Private properties
  private fixedWeekday!: IFixedWeekday;
  //#endregion

  //#region Constructor & C°
  public constructor() {
    super();
  }
  //#endregion

  //#region Abstract methods implementation
  protected createHoliday(
    key: string, category: Category, cycle: Cycle, validFrom: number, validTo: number): IFixedWeekdayHoliday {
    return new FixedWeekdayHoliday(key, category, cycle, validFrom, validTo, this.fixedWeekday);
  }

  protected extractData(obj: any): void {
    this.fixedWeekday = this.dataExtractor.extractFixedWeekday(obj);
  }

  protected extractKey(obj: any): string {
    return this.dataExtractor.extractStringKey(obj);
  }
  //#endregion

}
