import { IFileProvider, IHoliday, IHierarchy } from '../api';
import { IBaseHoliday, IChristianHoliday, IFixedDateHoliday, IFixedWeekdayHoliday, IRelativeHoliday  } from '../configuration';
import { ConfigurationFactory, HolidayType  } from '../configuration';
import { HierarchyFilter } from './hierarchy-filter';
import { ChristianHolidayCalculator } from './christian-holiday-calculator';
import { FixedHolidayCalculator } from './fixed-holiday-calculator';
import { FixedWeekdayCalculator } from './fixed-weekday-calculator';
import { RelativeHolidayCalculator } from './relative-holiday-calculator';

export interface IHierarchyCalculator {
  getHolidays(hierarchy: string, year: number, deep: boolean): Promise<Array<IHoliday>>;
  getHierarchyTree(): Promise<Array<IHierarchy>>;
  getSupportedLanguages(): Promise<Array<string>>;
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
    const dataString = await this.fileProvider.loadConfiguration(root);
    const configuration = new ConfigurationFactory().loadConfigurationFromString('root', dataString);
    const holidays = new HierarchyFilter().filterConfigurationByHierarchy(configuration, hierarchy, deep);
    const result = new Array<IHoliday | undefined>();
    holidays.forEach(holiday => result.push(this.calculateHoliday(holiday, year - 1)));
    holidays.forEach(holiday => result.push(this.calculateHoliday(holiday, year)));
    holidays.forEach(holiday => result.push(this.calculateHoliday(holiday, year + 1)));
    return result.filter( (holiday: IHoliday | undefined) =>
      holiday !== undefined && holiday.date.getFullYear() === year
    ) as Array<IHoliday>;
  }

  public async getHierarchyTree(): Promise<Array<IHierarchy>> {
    const loadPromises: Array<Promise<string>> = [
      this.fileProvider.loadHierarchies(),
      this.fileProvider.loadHierarchyTranslations(this.currentLanguage),
      this.fileProvider.loadHierarchyTranslations()
    ];
    let result: Array<IHierarchy>;
    let translations: any;
    let fallback: any;
    return Promise.all(loadPromises).then( (strings: Array<string>) =>
    {
      result = JSON.parse(strings[0]);
      translations = JSON.parse(strings[1]);
      fallback = JSON.parse(strings[2]);
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
  private calculateHoliday(holiday: IBaseHoliday<any>, year: number): IHoliday | undefined {
    let date: Date | undefined;
    switch(holiday.holidayType) {
      case HolidayType.CHRISTIAN: {
        date = new ChristianHolidayCalculator().calculate(holiday as IChristianHoliday, year);
        break;
      }
      case HolidayType.ETHIOPIAN_ORTHODOX: {
        date = undefined;
        break;
      }
      case HolidayType.FIXED_DATE: {
        date = new FixedHolidayCalculator().calculate(holiday as IFixedDateHoliday, year);
        break;
      }
      case HolidayType.FIXED_WEEKDAY: {
        date = new FixedWeekdayCalculator().calculate(holiday as IFixedWeekdayHoliday, year);
        break;
      }
      case HolidayType.ISLAMIC: {
        date = undefined;
        break;
      }
      case HolidayType.RELATIVE_BETWEEN_FIXED:
      case HolidayType.RELATIVE_TO_DATE:
      case HolidayType.RELATIVE_TO_WEEKDAY: {
        date = new RelativeHolidayCalculator().calculate(holiday as IRelativeHoliday<any, any>, year)
      }
    }

    let result: IHoliday | undefined;
    if (date) {
      result = {
        date,
        key: holiday.key,
        name: holiday.key
      };
      return result;
    } else {
      result = undefined;
    }
    return result;
  }

  private translateHierarchyTree(tree: Array<IHierarchy>, translations: any, fallback: any): Array<IHierarchy> {
    tree.forEach( (hierarchy: IHierarchy) => this.translateHierarchy(hierarchy, translations, fallback));
    return tree;
  }

  private translateHierarchy(hierachy: IHierarchy, translations: any, fallback: any): IHierarchy {
    if (hierachy.children) {
      hierachy.children.forEach( (hierarchy: IHierarchy) => this.translateHierarchy(hierarchy, translations, fallback));
    }
    if (translations[hierachy.fullPath]) {
      hierachy.description = translations[hierachy.fullPath];
    } else if
    (fallback[hierachy.fullPath]) {
      hierachy.description = fallback[hierachy.fullPath];
    }
    return hierachy;
  }
  // </editor-fold>

}
