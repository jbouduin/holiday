// import { IHierarchyCalculator, HierarchyCalculator } from '@jbouduin/holidays-lib';
import { IHierarchy, IHoliday } from '@jbouduin/holidays-lib';
import { IHolidays } from '@jbouduin/holidays-lib';

export class HolidaysHttp implements IHolidays {

  // <editor-fold desc='private properties'>
  // private hierarchyCalculator: IHierarchyCalculator;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor(language?: string) {
    // this.hierarchyCalculator = new HierarchyCalculator(language || 'en_GB');
  }

  // </editor-fold>

  // <editor-fold desc='IHolidays interface methods'>
  getHierarchyTree(): Promise<Array<IHierarchy>> {
    return Promise.resolve(new Array<IHierarchy>());
  }
  getHolidays(path: string, year: number, deep?: boolean | undefined): Promise<Array<IHoliday>> {
    return Promise.resolve(new Array<IHoliday>());
  }
  getSupportedLanguages(): Promise<Array<string>> {
    return Promise.resolve(new Array<string>());
  }
  // </editor-fold>
}