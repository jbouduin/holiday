import { IFixedDateHoliday, FixedDateHoliday } from '../holidays';
import { IFixedDate } from '../specifics';
import { Category, Cycle } from '../types';
import { IBaseFactory, BaseFactory } from './base-factory';

export interface IFixedDateFactory extends IBaseFactory<IFixedDateHoliday, string>{ }

export class FixedDateFactory extends BaseFactory<IFixedDateHoliday, string> implements IFixedDateFactory {

  //#region Private properties
  private fixedDate!: IFixedDate;
  //#endregion

  //#region Constructor & C°
  public constructor() {
    super();
  }
  //#endregion

  //#region Abstract methods implementation
  protected createHoliday(
    key: string, category: Category, cycle: Cycle, validFrom: number, validTo: number): IFixedDateHoliday {
    return new FixedDateHoliday(
      key, category, cycle, validFrom, validTo, this.fixedDate);
  }

  protected extractData(obj: any): void {
    this.fixedDate = this.dataExtractor.extractFixedDate(obj);
  }

  protected extractKey(obj: any): string {
    return this.dataExtractor.extractStringKey(obj);
  }
  //#endregion

}
