import { ErrorKey, ILoadError, LoadError } from '../errors';
import { IBaseHoliday, BaseHoliday } from '../holidays';
import { IFixedDate, IFixedWeekday, IRelationWhichWeekdayWhen } from '../specifics';
import { Cycle, CycleKeyStrings } from '../types';
import { Category, CategoryKeyStrings } from '../types';

import { IDataExtractor, DataExtractor } from './data-extractor';
import { IFactoryResult, FactoryResult } from './factory-result';

export interface IBaseFactory<T extends IBaseHoliday<U>, U> {
  create(location: string, obj: any): IFactoryResult<T>;
}

export abstract class BaseFactory<T extends IBaseHoliday<U>, U> implements IBaseFactory<IBaseHoliday<U>, U> {

  // <editor-fold desc='Private properties'>
  private errors: Array<ILoadError>;
  private location: string;
  // </editor-fold>

  // <editor-fold desc='Protected properties'>
  protected dataExtractor: IDataExtractor;
  private cycle: Cycle;
  private category: Category;
  private validFrom: number;
  private validTo: number;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor() {
    this.location = '';
    this.dataExtractor = new DataExtractor(this.addError.bind(this));
    this.errors = new Array<ILoadError>();
    this.validFrom = BaseHoliday.undefinedValidFrom;
    this.validTo = BaseHoliday.undefinedValidTo;
    this.cycle = Cycle.EVERY_YEAR;
    this.category = Category.OFFICIAL_HOLIDAY;
  }
  // </editor-fold>

  // <editor-fold desc='Abstract methods'>
  protected abstract extractKey(obj: any): U;
  protected abstract extractData(obj: any): void;
  protected abstract createHoliday(key: U, category: Category, cycle: Cycle, validFrom: number, validTo: number): T;
  // </editor-fold>

  // <editor-fold desc='IBaseFactory interface methods'>
  public create(location: string, obj: any): IFactoryResult<T> {
    this.location = location;
    const key = this.extractKey(obj);
    const moves = this.dataExtractor.extractMoves(obj);
    this.extractBaseHolidayData(obj);
    this.extractData(obj);

    if (this.errors.length === 0) {
      const holiday = this.createHoliday(key, this.category, this.cycle, this.validFrom, this.validTo);
      moves.forEach(move => holiday.moves.push(move));
      return new FactoryResult<T>(holiday, this.errors);
    } else {
      return new FactoryResult<T>(undefined, this.errors);
    }
  }
  // </editor-fold>

  // <editor-fold desc='Protected helper methods'>
  protected addError(key: string, ...args: Array<any>): void {
    this.errors.push(new LoadError(key, this.location, args));
  }
  // </editor-fold>

  // <editor-fold desc='Private helper methods'>
  private extractBaseHolidayData(obj: any): void {
    if (obj.validFrom) {
      this.validFrom = Number(obj.validFrom);
    }

    if (obj.validTo) {
      this.validTo = Number(obj.validTo);
    }

    if (obj.cycle) {
      this.cycle = Cycle[<CycleKeyStrings>obj.cycle];
    }

    if (obj.category) {
      this.category = Category[<CategoryKeyStrings>obj.category];
    }

    if (this.cycle === undefined) {
      this.addError(ErrorKey.HOLIDAY_CYCLE_INVALID, obj.cycle);
    } else {
      switch (this.cycle) {
        case Cycle.TWO_YEARS:
        case Cycle.FOUR_YEARS:
        case Cycle.FIVE_YEARS:
        case Cycle.SIX_YEARS: {
          if (this.validFrom === BaseHoliday.undefinedValidFrom) {
            this.addError(ErrorKey.HOLIDAY_CYCLE_REQUIRES_VALID_FROM, obj.cycle, obj.validFrom);
            break;
          }
        }
      }
    }

    if (this.category === undefined) {
      this.addError(ErrorKey.HOLIDAY_CATEGORY_INVALID, obj.category);
    }

    if (!this.validFrom) {
      this.addError(ErrorKey.VALID_FROM_INVALID, obj.validFrom);
    }

    if (!this.validTo) {
      this.addError(ErrorKey.VALID_TO_INVALID, obj.validTo);
    }

    if (this.validFrom && this.validTo && this.validFrom > this.validTo) {
      this.addError(ErrorKey.VALID_TO_BEFORE_VALID_FROM, obj.validTo, obj.validFrom);
    }
  }
  // </editor-fold>

}
