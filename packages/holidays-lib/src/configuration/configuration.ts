import * as fs from 'fs';
import * as path from 'path';

// holiday related
import { IBaseHoliday } from './holidays/base-holiday';
import { CycleType, CycleTypeKeyStrings } from './holidays/cycle-type';
import { HolidayStatus, HolidayStatusKeyStrings } from './holidays/holiday-status';
import { HolidayType, HolidayTypeKeyStrings } from './holidays/holiday-type';
// fixed holiday related
import { IFixedDateHoliday, FixedDateHoliday } from './holidays/fixed-date-holiday';
import { Month, MonthKeyStrings } from './holidays/month';
// Christian holiday related
import { IChristianHoliday, ChristianHoliday } from './holidays/christian-holiday';
import { ChristianHolidayType, ChristianHolidayTypeKeyStrings } from './holidays/christian-holiday-type';
import { ChronologyType, ChronologyTypeKeyStrings } from './holidays/chronology-type';
// Ethiopian-orthodox holiday related
import { IEthiopianOrthodoxHoliday, EthiopianOrthodoxHoliday } from './holidays/ethiopian-orthodox-holiday';
import { EthiopianOrthodoxHolidayType, EthiopianOrthodoxHolidayTypeKeyStrings } from './holidays/ethiopian-orthodox-holiday-type';
// Islamic holiday related
import { IIslamicHoliday, IslamicHoliday } from './holidays/islamic-holiday';
import { IslamicHolidayType, IslamicHolidayTypeKeyStrings } from './holidays/islamic-holiday-type';

export interface IConfiguration {
  hierarchy: string;
  description: string;
  holidayCollection: Array<IBaseHoliday<any>>;
  subConfiguration?: Array<IConfiguration>;
  validate(): Array<string>;
  // calculate(year: number): Array<Date>;
}

export class Configuration implements IConfiguration {

  // <editor-fold desc='IConfiguration interface properties'>
  public hierarchy!: string;
  public description!: string;
  public holidayCollection: Array<IBaseHoliday<any>>;
  public subConfiguration: Array<Configuration>;
  // </editor-fold>

  // <editor-fold desc='Static factoriy methods'>
  public static loadByHierarchy (hierarchy: string): IConfiguration {
    const fileName = path.join(__dirname, `../assets/configurations/${hierarchy}.json`);
    return Configuration.loadByFileName(fileName);
  }

  public static loadByFileName(fileName: string): IConfiguration {
    const result = new Configuration();
    result.loadFromFile(fileName);
    return result;
  }
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  private constructor() {
    this.subConfiguration = new Array<Configuration>();
    this.holidayCollection = new Array<IBaseHoliday<any>>();
  }
  // </editor-fold>

  // <editor-fold desc='IConfiguration interface methods'>
  public validate(): Array<string> {
    let result = new Array<string>();
    if (!this.hierarchy) {
      result.push('Configuration has no hierarchy');
    }
    if (!this.description) {
      result.push('Configuration has no description');
    }
    this.holidayCollection.forEach(holiday => result = result.concat(holiday.validate()));
    return result;
  }
  // </editor-fold>

  // <editor-fold desc='Private methods'>
  private loadFromFile(fileName: string): void {
    const data = fs.readFileSync(fileName, 'utf-8');
    const obj = JSON.parse(data);
    this.hierarchy = obj.hierarchy;
    this.description = obj.description;
    if (obj.holidayCollection?.length > 0) {
      obj.holidayCollection.forEach( (holiday: any) => {
        const holidayType = HolidayType[<HolidayTypeKeyStrings>holiday.holidayType];
        switch(holidayType) {
          case HolidayType.CHRISTIAN: {
            this.holidayCollection.push(this.processChristianHoliday(holiday));
            break;
          }
          case HolidayType.ETHIOPIAN_ORTHODOX: {
            this.holidayCollection.push(this.processEthiopianOrthodoxHoliday(holiday));
            break;
          }
          case HolidayType.FIXED_DATE: {
            this.holidayCollection.push(this.processFixedDateHoliday(holiday));
            break;
          }
          case HolidayType.ISLAMIC: {
            this.holidayCollection.push(this.processIslamicHoliday(holiday));
            break;
          }
          default: {
            throw Error('Invalid holiday type');
          }
        }
      });
    } else {
      throw Error('no holidays in the configuration file');
    }
  }

  private processChristianHoliday(obj: any): IChristianHoliday {
    const result = new ChristianHoliday(
      ChristianHolidayType[<ChristianHolidayTypeKeyStrings>obj.type],
      ChronologyType[<ChronologyTypeKeyStrings>obj.chronology]);
    this.processHoliday(result, obj);
    return result;
  }

  private processEthiopianOrthodoxHoliday(obj: any): IEthiopianOrthodoxHoliday {
    const result = new EthiopianOrthodoxHoliday(
      EthiopianOrthodoxHolidayType[<EthiopianOrthodoxHolidayTypeKeyStrings>obj.type]);
    this.processHoliday(result, obj);
    return result;
  }

  private processFixedDateHoliday(obj: any): IFixedDateHoliday {
    const result = new FixedDateHoliday(obj.key, Month[<MonthKeyStrings>obj.month], obj.day);
    this.processHoliday(result, obj);
    return result;
  }

  private processIslamicHoliday(obj: any): IIslamicHoliday {
    const result = new IslamicHoliday(
      IslamicHolidayType[<IslamicHolidayTypeKeyStrings>obj.type]);
    this.processHoliday(result, obj);
    return result;
  }

  private processHoliday(holiday: IBaseHoliday<any>, obj: any): void {

    if (obj.validFrom) {
      holiday.validFrom = obj.validFrom;
    }

    if (obj.validTo) {
      holiday.validTo = obj.validTo;
    }

    if (obj.cycleType) {
      holiday.cycleType = CycleType[<CycleTypeKeyStrings>obj.cycleType];
    }

    if (obj.holidayStatus) {
      holiday.holidayStatus = HolidayStatus[<HolidayStatusKeyStrings>obj.holidayStatus];
    }
  }
  // </editor-fold>

}
