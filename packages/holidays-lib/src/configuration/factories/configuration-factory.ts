import * as fs from 'fs';
import * as path from 'path';
import { ErrorKey } from '../errors';
import { IBaseHoliday } from '../holidays';
import { IConfiguration, Configuration } from '../configuration';
import { HolidayType, HolidayTypeKeyStrings } from '../types';
import { IFactoryResult } from './factory-result';
import { ChristianFactory } from './christian-factory';
import { FixedDateFactory } from './fixed-date-factory';
import { FixedWeekdayFactory } from './fixed-weekday-factory';
import { EthiopianOrthodoxFactory } from './ethiopian-orthodox-factory';
import { IslamicFactory } from './islamic-factory';
import { RelativeBetweenFixedFactory } from './relative-between-fixed-factory';
import { RelativeToDateFactory } from './relative-to-date-factory';
import { RelativeToWeekdayFactory } from './relative-to-weekday-factory';

export interface IConfigurationFactory {
  loadByHierarchy (hierarchy: string): IConfiguration;
  loadByFileName(fileName: string): IConfiguration;
}

export class ConfigurationFactory implements IConfigurationFactory {

  // <editor-fold desc='Constructor & C°'>
  public constructor() { }
  // </editor-fold>

  // <editor-fold desc='IConfigurationFactory interface methods'>
  public loadByHierarchy (hierarchy: string): IConfiguration {
    const root = hierarchy.split('/')[0];
    if (root.length === 0) {
      const result = new Configuration('', '');
      result.addError(ErrorKey.HIERARCHY_INVALID, 'root', hierarchy);
      return result;
    }

    const fileName = path.join(__dirname, `../../assets/configurations/${root}.json`);
    return this.loadByFileName(fileName);
  }

  public loadByFileName(fileName: string): IConfiguration {
    const result = new Configuration('', '');
    if (!fs.existsSync(fileName)) {
      result.addError(ErrorKey.FILE_NOT_FOUND, 'root', fileName);
      return result;
    }

    let data: string;
    try {
      data = fs.readFileSync(fileName, 'utf-8');
    } catch (error) {
      result.addError(ErrorKey.COULD_NOT_READ_FILE, 'root', fileName, error);
      return result;
    }

    let obj: any;
    try {
      obj = JSON.parse(data);
    } catch (error) {
      result.addError(ErrorKey.INVALID_FILE_CONTENTS, 'root', fileName, error);
      return result;
    }

    return this.loadConfiguration('root', obj);
  }
  // </editor-fold>

  // <editor-fold desc='Private methods'>
  private loadConfiguration(parent: string, obj: any): IConfiguration {
    const result = new Configuration(obj.hierarchy, obj.description);
    let hierarchy: string;

    if (!result.hierarchy) {
      result.addError(ErrorKey.HIERARCHY_NOT_SPECIFIED, parent);
      hierarchy = parent;
    } else {
      hierarchy = `${parent === 'root' ? '' : parent}/${result.hierarchy}`;
    }

    if (!result.description) {
      result.addError(ErrorKey.DESCRIPTION_NOT_SPECIFIED, hierarchy);
    }

    if (!obj.holidays) {
      result.addError(ErrorKey.HOLIDAY_COLLECTION_MISSING, hierarchy);
    } else if (obj.holidays.length === 0) {
      result.addError(ErrorKey.HOLIDAY_COLLECTION_EMPTY, hierarchy);
    }

    if (result.errors.length > 0) {
      return result;
    }

    let holidayNumber = 1;

    obj.holidays.forEach( (holiday: any) => {
      const location = `${hierarchy}/${holidayNumber}`;
      const holidayType = HolidayType[<HolidayTypeKeyStrings>holiday.holidayType];

      switch(holidayType) {
        case HolidayType.CHRISTIAN: {
          this.processFactoryResult(new ChristianFactory().create(location, holiday), result);
          break;
        }
        case HolidayType.ETHIOPIAN_ORTHODOX: {
          this.processFactoryResult(new EthiopianOrthodoxFactory().create(location, holiday), result);
          break;
        }
        case HolidayType.FIXED_DATE: {
          this.processFactoryResult(new FixedDateFactory().create(location, holiday), result);
          break;
        }
        case HolidayType.FIXED_WEEKDAY: {
          this.processFactoryResult(new FixedWeekdayFactory().create(location, holiday), result);
          break;
        }
        case HolidayType.ISLAMIC: {
          this.processFactoryResult(new IslamicFactory().create(location, holiday), result);
          break;
        }
        case HolidayType.RELATIVE_BETWEEN_FIXED: {
          this.processFactoryResult(new RelativeBetweenFixedFactory().create(location, holiday), result);
          break;
        }
        case HolidayType.RELATIVE_TO_DATE: {
          this.processFactoryResult(new RelativeToDateFactory().create(location, holiday), result);
          break;
        }
        case HolidayType.RELATIVE_TO_WEEKDAY: {
          this.processFactoryResult(new RelativeToWeekdayFactory().create(location, holiday), result);
          break;
        }
        default: {
          result.addError(ErrorKey.HOLIDAY_TYPE_INVALID, location, holiday.holidayType);
        }
      }
      holidayNumber++;
    });
    if (result.holidays.length === 0) {
      result.addError(ErrorKey.NO_VALID_HOLIDAYS_IN_COLLECTION, hierarchy);
    }

    if (obj.subConfigurations) {
      obj.subConfigurations
        .forEach( (sub: any) => result.subConfigurations.push(this.loadConfiguration(hierarchy, sub)));
    }
    return result;
  }

  private processFactoryResult(factoryResult: IFactoryResult<IBaseHoliday<any>>, configuration: IConfiguration): void {
    if (factoryResult.errors.length > 0) {
      factoryResult.errors.forEach(error => configuration.errors.push(error));
    }
    if (factoryResult.holiday) {
      configuration.holidays.push(factoryResult.holiday);
    }
  }
  // </editor-fold>
}
