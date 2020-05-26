import { ErrorKeys, ILoadError, LoadError } from '../errors';
import { IBaseHoliday, BaseHoliday } from '../holidays';
import { IFixedDate, IFixedWeekday } from '../specifics';
import { CycleType, CycleTypeKeyStrings } from '../types';
import { HolidayStatus, HolidayStatusKeyStrings } from '../types';
import { Month, MonthKeyStrings } from '../types';
import { Weekday, WeekdayKeyStrings } from '../types';
import { Which, WhichKeyStrings } from '../types'

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
  protected obj: any;
  protected key!: U;
  protected cycleType: CycleType;
  protected holidayStatus: HolidayStatus;
  protected validFrom: number;
  protected validTo: number;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor() {
    this.location = '';
    this.errors = new Array<ILoadError>();
    this.validFrom = BaseHoliday.undefinedValidFrom;
    this.validTo = BaseHoliday.undefinedValidTo;
    this.cycleType = CycleType.EVERY_YEAR;
    this.holidayStatus = HolidayStatus.OFFICIAL_HOLIDAY;
  }
  // </editor-fold>

  // <editor-fold desc='Abstract methods'>
  protected abstract extractKey(obj: any): U;
  protected abstract extractData(obj: any): void;
  protected abstract createHoliday(key: U, holidayStatus: HolidayStatus, cycleType: CycleType, validFrom: number, validTo: number): T;
  // </editor-fold>

  // <editor-fold desc='IBaseFactory interface methods'>
  public create(location: string, obj: any): IFactoryResult<T> {
    this.errors = new Array<ILoadError>();
    this.location = location;
    this.obj = obj;
    this.key = this.extractKey(obj);
    this.extractBaseHolidayData(obj);
    this.extractData(obj);

    if (this.errors.length === 0) {
      const holiday = this.createHoliday(this.key, this.holidayStatus, this.cycleType, this.validFrom, this.validTo);
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

  protected extractBaseHolidayData(obj: any): void {
    if (obj.validFrom) {
      this.validFrom = Number(obj.validFrom);
    }

    if (obj.validTo) {
      this.validTo = Number(obj.validTo);
    }

    if (obj.cycleType) {
      this.cycleType = CycleType[<CycleTypeKeyStrings>obj.cycleType];
    }

    if (obj.holidayStatus) {
      this.holidayStatus = HolidayStatus[<HolidayStatusKeyStrings>obj.holidayStatus];
    }

    if (this.cycleType === undefined) {
      this.addError(ErrorKeys.CYCLE_TYPE_INVALID, obj.cycletype);
    } else {
      switch (this.cycleType) {
        case CycleType.TWO_YEARS:
        case CycleType.FOUR_YEARS:
        case CycleType.FIVE_YEARS:
        case CycleType.SIX_YEARS: {
          if (this.validFrom === BaseHoliday.undefinedValidFrom) {
            this.addError(ErrorKeys.CYCLE_TYPE_REQUIRES_VALID_FROM, obj.CycleType, obj.validFrom);
            break;
          }
        }
      }
    }

    if (this.holidayStatus === undefined) {
      this.addError(ErrorKeys.HOLIDAY_STATUS_INVALID, obj.HolidayStatus);
    }

    if (!this.validFrom) {
      this.addError(ErrorKeys.VALID_FROM_INVALID, obj.validFrom);
    }

    if (!this.validTo) {
      this.addError(ErrorKeys.VALID_TO_INVALID, obj.validTo);
    }

    if (this.validFrom && this.validTo && this.validFrom > this.validTo) {
      this.addError(ErrorKeys.VALID_TO_BEFORE_VALID_FROM, obj.validTo, obj.validFrom);
    }
  }

  protected extractFixedDate(obj: any): IFixedDate {
    const result: IFixedDate = {
      day: Number(obj.day),
      month: Month[<MonthKeyStrings>obj.month]
    };

    if (!result.day && result.day !== 0) {
      if (!obj.day) {
        this.addError(ErrorKeys.FIXED_DATE_DAY_MISSING);
      } else  {
        this.addError(ErrorKeys.FIXED_DATE_DAY_INVALID, obj.day);
      }
    }

    if (result.month === undefined) {
      if (!obj.month || obj.month === '') {
        this.addError(ErrorKeys.FIXED_DATE_MONTH_MISSING);
      } else {
        this.addError(ErrorKeys.FIXED_DATE_MONTH_INVALID, obj.day);
      }
    } else if (result.day  || result.day === 0) {
      if (result.day > 0) {
        switch(result.month) {
          case Month.APRIL:
          case Month.JUNE:
          case Month.SEPTEMBER:
          case Month.NOVEMBER: {
            if (result.day > 30) {
              this.addError(ErrorKeys.FIXED_DATE_DAY_OUT_OF_RANGE, result.day, Month[result.month]);
            }
            break;
          }
          case Month.FEBRUARY: {
            if (result.day > 29) {
              this.addError(ErrorKeys.FIXED_DATE_DAY_OUT_OF_RANGE, result.day, Month[result.month]);
            }
            break;
          }
          default: {
            if (result.day > 31) {
              this.addError(ErrorKeys.FIXED_DATE_DAY_OUT_OF_RANGE, result.day, Month[result.month]);
            }
          }
        }
      }
      else {
        this.addError(ErrorKeys.FIXED_DATE_DAY_OUT_OF_RANGE, result.day);
      }
    }
    return result;
  }

  protected extractFixedWeekday(obj: any): IFixedWeekday {
    const result: IFixedWeekday = {
      month: Month[<MonthKeyStrings>obj.month],
      weekday: Weekday[<WeekdayKeyStrings>obj.weekday],
      which: Which[<WhichKeyStrings>obj.which]
    }

    if (result.month === undefined) {
      if (obj.month) {
        this.addError(ErrorKeys.FIXED_WEEKDAY_MONTH_INVALID, obj.month);
      } else {
        this.addError(ErrorKeys.FIXED_WEEKDAY_MONTH_MISSING);
      }
    }

    if (result.weekday === undefined) {
      if (obj.weekday) {
        this.addError(ErrorKeys.FIXED_WEEKDAY_WEEKDAY_INVALID, obj.weekday);
      } else {
        this.addError(ErrorKeys.FIXED_WEEKDAY_WEEKDAY_MISSING);
      }
    }

    if (result.which === undefined) {
      if (obj.which) {
        this.addError(ErrorKeys.FIXED_WEEKDAY_WHICH_INVALID, obj.which);
      } else {
        this.addError(ErrorKeys.FIXED_WEEKDAY_WHICH_MISSING);
      }
    }
    return result;
  }

  protected extractStringKey(obj: any): string {
    const result = obj.key;
    if (!result) {
      this.addError(ErrorKeys.KEY_MISSING);
    }
    return result;
  }

  // protected calculateFixedFate(fixedDate: IFixedDate): Date {
  //   let result = Date(1986, fixedDate.month, fixedDate.day);
  // }
  // </editor-fold>


}
