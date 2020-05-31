import { IHierarchyCalculator, HierarchyCalculator } from '@jbouduin/holidays-lib';
import { IHierarchy, IHoliday } from '@jbouduin/holidays-lib';
import { IHolidays } from '@jbouduin/holidays-lib';

import { FileProvider } from './file-provider';

export class Holidays implements IHolidays {

  // <editor-fold desc='private properties'>
  private hierarchyCalculator: IHierarchyCalculator;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor(assetsPath: string, language?: string) {
    this.hierarchyCalculator = new HierarchyCalculator(language || 'en_GB', new FileProvider(assetsPath));
  }
  // </editor-fold>

  // <editor-fold desc='Public methods'>
  public getHierarchyTree(): Promise<Array<IHierarchy>> {
    return this.hierarchyCalculator.getHierarchyTree();
  }

  public getHolidays(path: string, year: number, deep: boolean): Promise<Array<IHoliday>> {
    return this.hierarchyCalculator.getHolidays(path, year, deep);
  }

  public getSupportedLanguages(): Promise<Array<string>> {
    return Promise.resolve(new Array<string>());
  }
  // </editor-fold>
}
