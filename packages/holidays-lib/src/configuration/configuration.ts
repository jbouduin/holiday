import * as fs from 'fs';
import * as path from 'path';

import { ChristianHolidayType, ChristianHolidayTypeKeyStrings } from './types';
import { ChronologyType, ChronologyTypeKeyStrings } from './types';
import { CycleType, CycleTypeKeyStrings } from './types';
import { EthiopianOrthodoxHolidayType, EthiopianOrthodoxHolidayTypeKeyStrings } from './types';
import { HolidayStatus, HolidayStatusKeyStrings } from './types';
import { HolidayType, HolidayTypeKeyStrings } from './types';
import { IslamicHolidayType, IslamicHolidayTypeKeyStrings } from './types';
import { Month, MonthKeyStrings } from './types';
import { Weekday, WeekdayKeyStrings} from './types';
import { Which, WhichKeyStrings} from './types';

import { IBetweenFixedDates } from './specifics';
import { IFixedDate } from './specifics';

import { IBaseHoliday } from './holidays';
import { IChristianHoliday, ChristianHoliday } from './holidays';
import { IEthiopianOrthodoxHoliday, EthiopianOrthodoxHoliday } from './holidays';
import { IFixedDateHoliday, FixedDateHoliday } from './holidays';
import { IFixedWeekdayHoliday, FixedWeekdayHoliday } from './holidays';
import { IIslamicHoliday, IslamicHoliday } from './holidays';
import { IRelativeBetweenFixedHoliday, RelativeBetweenFixedHoliday } from './holidays';

export interface IConfiguration {
  hierarchy: string;
  description: string;
  holidayCollection: Array<IBaseHoliday<any>>;
  subConfiguration?: Array<IConfiguration>;
  validate(): Array<string>;
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
          case HolidayType.FIXED_WEEKDAY: {
            this.holidayCollection.push(this.processFixedWeekdayHoliday(holiday));
            break;
          }
          case HolidayType.ISLAMIC: {
            this.holidayCollection.push(this.processIslamicHoliday(holiday));
            break;
          }
          case HolidayType.RELATIVE_BETWEEN_FIXED: {
            this.holidayCollection.push(this.processRelativeBetweenFixedHoliday(holiday));
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
    const result = new ChristianHoliday(ChristianHolidayType[<ChristianHolidayTypeKeyStrings>obj.type]);
      if (obj.chronology) {
        result.chronology = ChronologyType[<ChronologyTypeKeyStrings>obj.chronology];
      } else {
        result.chronology = ChronologyType.GREGORIAN;
      }
    this.processHoliday(result, obj);
    return result;
  }

  private processEthiopianOrthodoxHoliday(obj: any): IEthiopianOrthodoxHoliday {
    const result = new EthiopianOrthodoxHoliday(EthiopianOrthodoxHolidayType[<EthiopianOrthodoxHolidayTypeKeyStrings>obj.type]);
    this.processHoliday(result, obj);
    return result;
  }

  private processFixedDateHoliday(obj: any): IFixedDateHoliday {
    const result = new FixedDateHoliday(obj.key, Month[<MonthKeyStrings>obj.month], obj.day);
    this.processHoliday(result, obj);
    return result;
  }

  private processFixedWeekdayHoliday(obj: any): IFixedWeekdayHoliday {
    const result = new FixedWeekdayHoliday(
      obj.key,
      Which[<WhichKeyStrings>obj.which],
      Weekday[<WeekdayKeyStrings>obj.weekday],
      Month[<MonthKeyStrings>obj.month] );
    this.processHoliday(result, obj);
    return result;
  }

  private processIslamicHoliday(obj: any): IIslamicHoliday {
    const result = new IslamicHoliday(IslamicHolidayType[<IslamicHolidayTypeKeyStrings>obj.type]);
    this.processHoliday(result, obj);
    return result;
  }

  private processRelativeBetweenFixedHoliday(obj: any): IRelativeBetweenFixedHoliday {
    let fix;
    if (obj.fix) {
      const from: IFixedDate = {
        day: Number(obj.fix.from.day),
        month: Month[<MonthKeyStrings>obj.fix.from.month]
      };
      const to: IFixedDate = {
        day: Number(obj.fix.to.day),
        month: Month[<MonthKeyStrings>obj.fix.to.month]
      }
      fix = {
        from,
        to
      } as IBetweenFixedDates;
    } else {
      fix = {
        from: {
          day: -1,
          month: Month[<MonthKeyStrings>'']
        },
        to : {
          day: -1,
          month: Month[<MonthKeyStrings>'']
        }
      }
    }

    const result = new RelativeBetweenFixedHoliday(
      obj.key,
      fix,
      Weekday[<WeekdayKeyStrings>obj.weekday]);
    this.processHoliday(result, obj);
    return result;
  }

  private processHoliday(holiday: IBaseHoliday<any>, obj: any): void {

    if (obj.validFrom) {
      holiday.validFrom = Number(obj.validFrom);
    }

    if (obj.validTo) {
      holiday.validTo = Number(obj.validTo);
    }

    if (obj.cycleType) {
      holiday.cycleType = CycleType[<CycleTypeKeyStrings>obj.cycleType];
    } else {
      holiday.cycleType = CycleType.EVERY_YEAR;
    }

    if (obj.holidayStatus) {
      holiday.holidayStatus = HolidayStatus[<HolidayStatusKeyStrings>obj.holidayStatus];
    } else {
      holiday.holidayStatus = HolidayStatus.OFFICIAL_HOLIDAY;
    }
  }
  // </editor-fold>

}
