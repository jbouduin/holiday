import { IHoliday, IHierarchy } from '../configuration/api';
import { IConfiguration } from '../configuration';

export interface IHierarchyCalculator {
  getHolidays(configurationLoader: (path: string) => IConfiguration, path: string, year: number, deep?: boolean): Array<IHoliday>;
  getHierarchyTree(hierarchyLoader: () => string): Array<IHierarchy>;
}

export class HierarchyCalculator implements IHierarchyCalculator {

  // <editor-fold desc='private properties'>
  private currentLanguage: string;
  // </editor-fold>

  // <editor-fold desc='Constructor'>
  public constructor(language: string) {
    this.currentLanguage = language;
  }
  // </editor-fold>
  public getHolidays(configurationLoader: (path: string) => IConfiguration, path: string, year: number, deep?: boolean): Array<IHoliday> {
    const configuration = configurationLoader(path);
    return new Array<IHoliday>();
  }

  public getHierarchyTree(hierarchyLoader: () => string): Array<IHierarchy> {
    const dataString = hierarchyLoader();
    const parse: Array<IHierarchy> = JSON.parse(dataString);
    return parse;
  }
}
