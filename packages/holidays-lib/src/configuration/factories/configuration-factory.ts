import * as fs from 'fs';
import * as path from 'path';
import { ErrorKeys } from '../errors';
import { IBaseHoliday } from '../holidays';
import { IConfiguration, Configuration } from '../configuration';
import { HolidayType, HolidayTypeKeyStrings } from '../types';
import { IFactoryResult } from './factory-result';
import { IChristianFactory, ChristianFactory } from './christian-factory';
import { IFixedDateFactory, FixedDateFactory } from './fixed-date-factory';
import { IFixedWeekdayFactory, FixedWeekdayFactory } from './fixed-weekday-factory';
import { IEthiopianOrthodoxFactory, EthiopianOrthodoxFactory } from './ethiopian-orthodox-factory';
import { IIslamicFactory, IslamicFactory } from './islamic-factory';

export interface IConfigurationFactory {
  loadByHierarchy (hierarchy: string): IConfiguration;
  loadByFileName(fileName: string): IConfiguration;
}

export class ConfigurationFactory implements IConfigurationFactory {

  // <editor-fold desc='Private properties'>
  private christianFactory: IChristianFactory;
  private ethiopianOrthodoxFactory: IEthiopianOrthodoxFactory;
  private fixedDateFactory: IFixedDateFactory;
  private fixedWeekdayFactory: IFixedWeekdayFactory
  private islamicFactory: IIslamicFactory;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor() {
    this.christianFactory = new ChristianFactory();
    this.ethiopianOrthodoxFactory = new EthiopianOrthodoxFactory();
    this.fixedDateFactory = new FixedDateFactory();
    this.fixedWeekdayFactory = new FixedWeekdayFactory
    this.islamicFactory = new IslamicFactory();
  }
  // </editor-fold>

  // <editor-fold desc='IConfigurationFactory interface methods'>
  public loadByHierarchy (hierarchy: string): IConfiguration {
    const root = hierarchy.split('/')[0];
    if (hierarchy.length === 0) {
      const result = new Configuration('', '');
      result.addError(ErrorKeys.HIERARCHY_INVALID, 'root', hierarchy);
      return result;
    }

    const fileName = path.join(__dirname, `../assets/configurations/${root}.json`);
    return this.loadByFileName(fileName);
  }

  public loadByFileName(fileName: string): IConfiguration {
    const result = new Configuration('', '');
    if (!fs.existsSync(fileName)) {
      result.addError(ErrorKeys.FILE_NOT_FOUND, 'root', fileName);
      return result;
    }

    let data: string;
    try {
      data = fs.readFileSync(fileName, 'utf-8');
    } catch (error) {
      const result = new Configuration('', '');
      result.addError(ErrorKeys.COULD_NOT_READ_FILE, 'root', fileName, error);
      return result;
    }

    let obj: any;
    try {
      const result = new Configuration('', '');
      obj = JSON.parse(data);
    } catch (error) {
      result.addError(ErrorKeys.INVALID_FILE_CONTENTS, 'root', fileName, error);
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
      result.addError(ErrorKeys.HIERARCHY_NOT_SPECIFIED, parent);
      hierarchy = parent;
    } else {
      hierarchy = `${parent === 'root' ? '' : parent}/${result.hierarchy}`;
    }

    if (!result.description) {
      result.addError(ErrorKeys.DESCRIPTION_NOT_SPECIFIED, hierarchy);
    }

    if (!obj.holidayCollection) {
      result.addError(ErrorKeys.HOLIDAY_COLLECTION_MISSING, hierarchy);
    } else if (obj.holidayCollection.length === 0) {
      result.addError(ErrorKeys.HOLIDAY_COLLECTION_EMPTY, hierarchy);
    }

    if (result.errors.length > 0) {
      return result;
    }


    let holidayNumber = 1;

    obj.holidayCollection.forEach( (holiday: any) => {
      const location = `${hierarchy}/${holidayNumber}`;
      let factoryResult: IFactoryResult<IBaseHoliday<any>>;
      const holidayType = HolidayType[<HolidayTypeKeyStrings>holiday.holidayType];

      switch(holidayType) {
        case HolidayType.CHRISTIAN: {
          this.processFactoryResult(this.christianFactory.create(location, holiday), result);
          break;
        }
        case HolidayType.ETHIOPIAN_ORTHODOX: {
          this.processFactoryResult(this.ethiopianOrthodoxFactory.create(location, holiday), result);
          break;
        }
        case HolidayType.FIXED_DATE: {
          this.processFactoryResult(this.fixedDateFactory.create(location, holiday), result);
          break;
        }
        case HolidayType.FIXED_WEEKDAY: {
          this.processFactoryResult(this.fixedWeekdayFactory.create(location, holiday), result);
          break;
        }
        case HolidayType.ISLAMIC: {
          this.processFactoryResult(this.islamicFactory.create(location, holiday), result);
          break;
        }
        case HolidayType.RELATIVE_BETWEEN_FIXED: {
          //this.holidayCollection.push(this.processRelativeBetweenFixedHoliday(holiday));
          break;
        }
        default: {
          result.addError(ErrorKeys.HOLIDAY_TYPE_INVALID, location, holiday.holidayType);
        }
      }
      holidayNumber++;
    });
    if (result.holidayCollection.length === 0) {
      result.addError(ErrorKeys.NO_VALID_HOLIDAYS_IN_COLLECTION, hierarchy);
    }
    return result;
  }

  private processFactoryResult(factoryResult: IFactoryResult<IBaseHoliday<any>>, configuration: IConfiguration): void {
    if (factoryResult.errors.length > 0) {
      factoryResult.errors.forEach(error => configuration.errors.push(error));
    }
    if (factoryResult.holiday) {
      configuration.holidayCollection.push(factoryResult.holiday);
    }
  }
  // </editor-fold>
}
