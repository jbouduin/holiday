import * as fs from 'fs';
import * as path from 'path';

// import { ChristianHolidayType, ChristianHolidayTypeKeyStrings } from './types';
// import { ChronologyType, ChronologyTypeKeyStrings } from './types';
// import { CycleType, CycleTypeKeyStrings } from './types';
// import { EthiopianOrthodoxHolidayType, EthiopianOrthodoxHolidayTypeKeyStrings } from './types';
// import { HolidayStatus, HolidayStatusKeyStrings } from './types';
// import { HolidayType, HolidayTypeKeyStrings } from './types';
// import { IslamicHolidayType, IslamicHolidayTypeKeyStrings } from './types';
// import { Month, MonthKeyStrings } from './types';
// import { Weekday, WeekdayKeyStrings} from './types';
// import { Which, WhichKeyStrings} from './types';

// import { IBetweenFixedDates } from './specifics';
// import { IFixedDate } from './specifics';

import { IBaseHoliday } from './holidays';
// import { IChristianHoliday, ChristianHoliday } from './holidays';
// import { IEthiopianOrthodoxHoliday, EthiopianOrthodoxHoliday } from './holidays';
// import { IFixedDateHoliday, FixedDateHoliday } from './holidays';
// import { IFixedWeekdayHoliday, FixedWeekdayHoliday } from './holidays';
// import { IIslamicHoliday, IslamicHoliday } from './holidays';
// import { IRelativeBetweenFixedHoliday, RelativeBetweenFixedHoliday } from './holidays';

import { ILoadError, LoadError } from './errors';

export interface IConfiguration {
  readonly hierarchy: string;
  readonly description: string;
  readonly errors: Array<ILoadError>;
  readonly holidayCollection: Array<IBaseHoliday<any>>;
  readonly subConfiguration?: Array<IConfiguration>;
  addError(key: string, location: string, ...args: Array<any>): void;
}

export class Configuration implements IConfiguration {

  // <editor-fold desc='IConfiguration interface properties'>
  public readonly hierarchy: string;
  public readonly description: string;
  public readonly errors: Array<ILoadError>;
  public readonly holidayCollection: Array<IBaseHoliday<any>>;
  public readonly subConfiguration: Array<IConfiguration>;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor(hierarchy: string, description: string) {
    this.hierarchy = hierarchy;
    this.description = description;
    this.errors = new Array<ILoadError>();
    this.holidayCollection = new Array<IBaseHoliday<any>>();
    this.subConfiguration = new Array<IConfiguration>();

  }
  // </editor-fold>

  // <editor-fold desc='IConfiguration interface methods'>
  public addError(key: string, location: string, ...args: Array<any>): void {
    this.errors.push(new LoadError(key, location, args));
  }
  // </editor-fold>

}
