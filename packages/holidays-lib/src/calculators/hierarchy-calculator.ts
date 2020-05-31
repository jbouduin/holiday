import { IFileProvider, IHoliday, IHierarchy } from '../api';
import { ConfigurationFactory } from '../configuration';

export interface IHierarchyCalculator {
  getHolidays(hierarchy: string, year: number, deep?: boolean): Promise<Array<IHoliday>>;
  getHierarchyTree(): Promise<Array<IHierarchy>>;
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
  public async getHolidays(hierarchy: string, year: number, deep?: boolean): Promise<Array<IHoliday>> {
    const root = hierarchy.split('/')[0];
    const dataString = await this.fileProvider.loadConfiguration(root);
    const configuration = new ConfigurationFactory().loadConfigurationFromString('root', dataString);
    return new Array<IHoliday>();
  }

  public async getHierarchyTree(): Promise<Array<IHierarchy>> {
    const dataString = await this.fileProvider.loadHierarchies();
    const parse: Array<IHierarchy> = JSON.parse(dataString);
    return parse;
  }
}
