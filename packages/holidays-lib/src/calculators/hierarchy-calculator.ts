import { IFileProvider, IHoliday, IHierarchy } from '../api';
import { IBaseHoliday, IChristianHoliday, IFixedDateHoliday, IFixedWeekdayHoliday, IRelativeHoliday, IConfiguration  } from '../configuration';
import { ConfigurationFactory, HolidayType  } from '../configuration';
import { HierarchyFilter, FilteredHoliday } from './helpers';
import { ChristianHolidayCalculator } from './christian-holiday-calculator';
import { FixedHolidayCalculator } from './fixed-holiday-calculator';
import { FixedWeekdayCalculator } from './fixed-weekday-calculator';
import { RelativeHolidayCalculator } from './relative-holiday-calculator';

export interface IHierarchyCalculator {
  getHolidays(hierarchy: string, year: number, deep: boolean): Promise<Array<IHoliday>>;
  getHierarchyTree(): Promise<Array<IHierarchy>>;
  getSupportedLanguages(): Promise<Array<string>>;
}

class CalculatedHoliday implements IHoliday {
  public date: Date;
  public key: string;
  public fullPath: string;
  public hierarchy: string;
  public name: string;
  public translationKey: string;

  public constructor(
    date: Date,
    fullPath: string,
    hierarchy: string,
    key: string,
    translationKey: string) {

    this.date = date;
    this.fullPath = fullPath;
    this.hierarchy = hierarchy;
    this.key = key;
    this.name = key;
    this.translationKey = translationKey
  }
}

export class HierarchyCalculator implements IHierarchyCalculator {

  // <editor-fold desc='private properties'>
  private currentLanguage: string;
  private fileProvider: IFileProvider;
  // </editor-fold>

  // <editor-fold desc='Constructor'>
  public constructor(language: string, fileProvider: IFileProvider) {
    this.currentLanguage = language;
    this.fileProvider = fileProvider
  }
  // </editor-fold>

  // <editor-fold desc='IHierarchyCalculator interface methods'>
  public async getHolidays(hierarchy: string, year: number, deep: boolean): Promise<Array<IHoliday>> {
    const root = hierarchy.split('/')[0];
    const loadPromises: Array<Promise<string>> = [
      this.fileProvider.loadConfiguration(root),
      this.fileProvider.loadHolidayTranslations(this.currentLanguage),
      this.fileProvider.loadHolidayTranslations()
    ];

    return Promise.all(loadPromises).then( strings => {
      const configuration: IConfiguration = new ConfigurationFactory().loadConfigurationFromString('root', strings[0]);
      const translations: any = JSON.parse(strings[1]);
      const fallback: any = JSON.parse(strings[2]);
      const holidays: Array<FilteredHoliday<any>> = new HierarchyFilter().filterConfigurationByHierarchy(configuration, hierarchy, deep);
      const calculatedHolidays = new Array<CalculatedHoliday | undefined>();
      holidays.forEach(holiday => calculatedHolidays.push(this.calculateHoliday(holiday, year - 1)));
      holidays.forEach(holiday => calculatedHolidays.push(this.calculateHoliday(holiday, year)));
      holidays.forEach(holiday => calculatedHolidays.push(this.calculateHoliday(holiday, year + 1)));
      const result: Array<CalculatedHoliday> = calculatedHolidays.filter( (holiday: IHoliday | undefined) =>
        holiday !== undefined && holiday.date.getFullYear() === year
      ) as Array<CalculatedHoliday>;
      result.forEach( (calculated: CalculatedHoliday) => this.translateHoliday(calculated, translations, fallback));
      return result as Array<IHoliday>;
    });
  }

  public async getHierarchyTree(): Promise<Array<IHierarchy>> {
    const loadPromises: Array<Promise<string>> = [
      this.fileProvider.loadHierarchies(),
      this.fileProvider.loadHierarchyTranslations(this.currentLanguage),
      this.fileProvider.loadHierarchyTranslations()
    ];

    return Promise.all(loadPromises).then( (strings: Array<string>) =>
    {
      const result: Array<IHierarchy> = JSON.parse(strings[0]);
      const translations: any = JSON.parse(strings[1]);
      const fallback: any = JSON.parse(strings[2]);
      return this.translateHierarchyTree(result, translations, fallback);
    });
  }

  public async getSupportedLanguages(): Promise<Array<string>> {
    const dataString = await this.fileProvider.loadLanguages();
    const parse: Array<string> = JSON.parse(dataString);
    return parse;
  }
  // </editor-fold>

  // <editor-fold desc='Private methods'>
  private calculateHoliday(holiday: FilteredHoliday<any>, year: number): CalculatedHoliday | undefined {
    let date: Date | undefined;
    switch(holiday.holiday.holidayType) {
      case HolidayType.CHRISTIAN: {
        date = new ChristianHolidayCalculator().calculate(holiday.holiday as IChristianHoliday, year);
        break;
      }
      case HolidayType.ETHIOPIAN_ORTHODOX: {
        date = undefined;
        break;
      }
      case HolidayType.FIXED_DATE: {
        date = new FixedHolidayCalculator().calculate(holiday.holiday as IFixedDateHoliday, year);
        break;
      }
      case HolidayType.FIXED_WEEKDAY: {
        date = new FixedWeekdayCalculator().calculate(holiday.holiday as IFixedWeekdayHoliday, year);
        break;
      }
      case HolidayType.ISLAMIC: {
        date = undefined;
        break;
      }
      case HolidayType.RELATIVE_BETWEEN_FIXED:
      case HolidayType.RELATIVE_TO_DATE:
      case HolidayType.RELATIVE_TO_WEEKDAY: {
        date = new RelativeHolidayCalculator().calculate(holiday.holiday as IRelativeHoliday<any, any>, year)
      }
    }

    return date ? new CalculatedHoliday(
      date,
      holiday.fullPath,
      holiday.hierarchy,
      holiday.holiday.stringKey,
      holiday.holiday.translationKey) : undefined;
  }

  private translateHierarchyTree(tree: Array<IHierarchy>, translations: any, fallback: any): Array<IHierarchy> {
    tree.forEach( (hierarchy: IHierarchy) => this.translateHierarchy(hierarchy, translations, fallback));
    return tree;
  }

  private translateHierarchy(hierachy: IHierarchy, translations: any, fallback: any): void {
    if (hierachy.children) {
      hierachy.children.forEach( (hierarchy: IHierarchy) => this.translateHierarchy(hierarchy, translations, fallback));
    }
    if (translations[hierachy.fullPath]) {
      hierachy.description = translations[hierachy.fullPath];
    } else if
    (fallback[hierachy.fullPath]) {
      hierachy.description = fallback[hierachy.fullPath];
    }
  }

  private translateHoliday(holiday: CalculatedHoliday, translations: any, fallback: any): void {
    if (translations[holiday.translationKey]) {
      holiday.name = translations[holiday.translationKey];
    } else if
    (fallback[holiday.translationKey]) {
      holiday.name = fallback[holiday.translationKey];
    } else {
      holiday.name = holiday.translationKey;
    }
  }
  // </editor-fold>

}
