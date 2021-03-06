// import { IHierarchyCalculator, HierarchyCalculator } from '@jbouduin/holidays-lib';
import { IHierarchy, IHoliday } from '@jbouduin/holidays-lib';
import { IHolidays } from '@jbouduin/holidays-lib';

export class HolidaysHttp implements IHolidays {

  //#region private properties
  // private hierarchyCalculator: IHierarchyCalculator;
  //#endregion

  //#region Constructor & C°
  public constructor(language?: string) {
    // this.hierarchyCalculator = new HierarchyCalculator(language || 'en_GB');
  }

  //#endregion

  //#region IHolidays interface methods
  public getHierarchyTree(): Promise<Array<IHierarchy>> {
    return Promise.resolve(new Array<IHierarchy>());
  }

  public getHolidays(path: string, year: number, deep?: boolean | undefined): Promise<Array<IHoliday>> {
    return Promise.resolve(new Array<IHoliday>());
  }

  public getSupportedLanguages(): Promise<Array<string>> {
    return Promise.resolve(new Array<string>());
  }
  //#endregion
}
