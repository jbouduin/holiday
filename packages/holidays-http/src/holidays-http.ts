import { IHierarchyCalculator, HierarchyCalculator } from '@jbouduin/holidays-lib';
import { IHierarchy, IHoliday } from '@jbouduin/holidays-lib';
import { IHolidays } from '@jbouduin/holidays-lib';
import { FileProvider } from './file-provider';
import { AxiosRequestConfig } from "axios";

export class HolidaysHttp implements IHolidays {

  //#region private properties ------------------------------------------------
  private hierarchyCalculator: IHierarchyCalculator;
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor(host: string, assetsDirectory: string, options: AxiosRequestConfig = {}, language?: string) {
    this.hierarchyCalculator = new HierarchyCalculator(language || 'en', new FileProvider(host, assetsDirectory, options));
  }
  //#endregion

  //#region IHolidays interface methods ---------------------------------------
  public getHierarchyTree(): Promise<Array<IHierarchy>> {
    return this.hierarchyCalculator.getHierarchyTree();
  }

  public getHolidays(path: string, year: number, deep: boolean): Promise<Array<IHoliday>> {
    return this.hierarchyCalculator.getHolidays(path, year, deep);
  }

  public getSupportedLanguages(): Promise<Array<string>> {
    return this.hierarchyCalculator.getSupportedLanguages();
  }
  //#endregion
}
