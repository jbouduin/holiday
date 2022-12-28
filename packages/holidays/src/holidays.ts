import { IHierarchyCalculator, HierarchyCalculator } from '@jbouduin/holidays-lib';
import { IHierarchy, IHoliday } from '@jbouduin/holidays-lib';
import { IHolidays } from '@jbouduin/holidays-lib';

import { FileProvider } from './file-provider';

export class Holidays implements IHolidays {

  //#region private properties ------------------------------------------------
  private hierarchyCalculator: IHierarchyCalculator;
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  /**
   *
   * @param assetsPath the root directory of the definition files
   * @param language Optional. If not set, the system falls back on 'en'
   */
  public constructor(assetsPath: string, language?: string) {
    this.hierarchyCalculator = new HierarchyCalculator(language || 'en', new FileProvider(assetsPath));
  }
  //#endregion

  //#region Public methods ----------------------------------------------------
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
