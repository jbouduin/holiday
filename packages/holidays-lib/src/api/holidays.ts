import { Holiday } from './holiday';
import { Hierarchy } from './hierachy';

export class Holidays {

  // <editor-fold desc='Constructor & C°'>
  public constructor(language?: string) {

  }
  // </editor-fold>

  // <editor-fold desc='Public methods'>
  public getHierarchyTree(): Array<Hierarchy> {
    return new Array<Hierarchy>();
  }
  public getHolidays(year: number, path: string, deep: boolean): Array<Holiday> {
    return new Array<Holiday>();
  }

  public getSupportedLanguages(): Array<string> {
    return new Array<string>();
  }
  // </editor-fold>
}
