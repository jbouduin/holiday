import { IHoliday } from './holiday';
import { IHierarchy } from './hierarchy';

export class Holidays {

  // <editor-fold desc='Constructor & C°'>
  public constructor(language?: string) {

  }
  // </editor-fold>

  // <editor-fold desc='Public methods'>
  public getHierarchyTree(): Array<IHierarchy> {
    return new Array<IHierarchy>();
  }
  public getHolidays(year: number, path: string, deep: boolean): Array<IHoliday> {
    return new Array<IHoliday>();
  }

  public getSupportedLanguages(): Array<string> {
    return new Array<string>();
  }
  // </editor-fold>
}
