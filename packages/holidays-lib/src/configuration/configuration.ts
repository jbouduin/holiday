import * as fs from 'fs';
import * as path from 'path';

import { IChristianHoliday, ChristianHoliday } from './holidays/christian-holiday';
import { ChristianHolidayType, ChristianHolidayTypeKeyStrings } from './holidays/christian-holiday-type';
import { ChronologyType, ChronologyTypeKeyStrings } from './holidays/chronology-type';
import { CycleType, CycleTypeKeyStrings } from './holidays/cycle-type';
import { IFixedHoliday, FixedHoliday } from './holidays/fixed-holiday';
import { IHoliday } from './holidays/holiday';
import { HolidayType, HolidayTypeKeyStrings } from './holidays/holiday-type';
import { Month, MonthKeyStrings } from './holidays/month';

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
    if (obj.holidayCollection.fixedHolidays?.length > 0) {
      obj.holidayCollection.fixedHolidays
        .forEach( (holiday: any) => this.holidayCollection.fixedHolidays.push(this.processFixedHoliday(holiday)));
    }
  }

  private processChristianHoliday(obj: any): IChristianHoliday {
    const result = new ChristianHoliday(
      ChristianHolidayType[<ChristianHolidayTypeKeyStrings>obj.type],
      ChronologyType[<ChronologyTypeKeyStrings>obj.chronologyType]);
    // result.type = obj.type;
    // if (obj.chronologyType) {
    //   result.chronologyType = obj.chronologyType;
    // }
    this.processHoliday(result, obj);
    return result;
  }

  private processFixedHoliday(obj: any): IFixedHoliday {
    const result = new FixedHoliday(obj.key, Month[<MonthKeyStrings>obj.month], obj.day);
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
