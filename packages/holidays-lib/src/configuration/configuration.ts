import * as fs from 'fs';
import * as path from 'path';

// holiday related
import { IHoliday } from './holidays/holiday';
import { CycleType, CycleTypeKeyStrings } from './holidays/cycle-type';
import { HolidayType, HolidayTypeKeyStrings } from './holidays/holiday-type';
// fixed holiday related
import { IFixedHoliday, FixedHoliday } from './holidays/fixed-holiday';
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

import { IHolidayCollection, HolidayCollection } from './holiday-collection';

export interface IConfiguration {
  hierarchy: string;
  description: string;
  holidayCollection: IHolidayCollection;
  subConfiguration?: Array<IConfiguration>;
}

export class Configuration implements IConfiguration {

  public hierarchy!: string;
  public description!: string;
  public holidayCollection: IHolidayCollection;
  public subConfiguration: Array<Configuration>;

  public static loadByHierarchy (hierarchy: string): IConfiguration {
    const fileName = path.join(__dirname, `../assets/configurations/${hierarchy}.json`);
    return Configuration.loadByFileName(fileName);
  }

  public  static loadByFileName(fileName: string): IConfiguration {
    const result = new Configuration();
    result.loadFromFile(fileName);
    return result;
  }

  private constructor() {
    this.subConfiguration = new Array<Configuration>();
    this.holidayCollection = new HolidayCollection();
  }

  private loadFromFile(fileName: string): void {
    const data = fs.readFileSync(fileName, 'utf-8');
    const obj = JSON.parse(data);
    this.hierarchy = obj.hierarchy;
    this.description = obj.description;
    if (obj.holidayCollection.christianHolidays?.length > 0) {
      obj.holidayCollection.christianHolidays
        .forEach( (holiday: any) => this.holidayCollection.christianHolidays.push(this.processChristianHoliday(holiday)));
    }
    if (obj.holidayCollection.ethiopianOrthodoxHolidays?.length > 0) {
      obj.holidayCollection.ethiopianOrthodoxHolidays
        .forEach( (holiday: any) => this.holidayCollection.ethiopianOrthodoxHolidays.push(this.processEthiopianOrthodoxHoliday(holiday)));
    }
    if (obj.holidayCollection.fixedHolidays?.length > 0) {
      obj.holidayCollection.fixedHolidays
        .forEach( (holiday: any) => this.holidayCollection.fixedHolidays.push(this.processFixedHoliday(holiday)));
    }
    if (obj.holidayCollection.islamicHolidays?.length > 0) {
      obj.holidayCollection.islamicHolidays
        .forEach( (holiday: any) => this.holidayCollection.islamicHolidays.push(this.processIslamicHoliday(holiday)));
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

  private processFixedHoliday(obj: any): IFixedHoliday {
    const result = new FixedHoliday(obj.key, Month[<MonthKeyStrings>obj.month], obj.day);
    this.processHoliday(result, obj);
    return result;
  }

  private processIslamicHoliday(obj: any): IIslamicHoliday {
    const result = new IslamicHoliday(
      IslamicHolidayType[<IslamicHolidayTypeKeyStrings>obj.type]);
    this.processHoliday(result, obj);
    return result;
  }

  private processHoliday(holiday: IHoliday, obj: any): void {

    if (obj.validFrom) {
      holiday.validFrom = obj.validFrom;
    }

    if (obj.validTo) {
      holiday.validTo = obj.validTo;
    }

    if (obj.cycleType) {
      holiday.cycleType = CycleType[<CycleTypeKeyStrings>obj.cycleType];
    }

    if (obj.holidayType) {
      holiday.holidayType = HolidayType[<HolidayTypeKeyStrings>obj.holidayType];
    }
  }


}
