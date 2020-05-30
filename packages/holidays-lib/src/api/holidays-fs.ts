import * as fs from 'fs';
import * as path from 'path';
import { IHierarchyCalculator, HierarchyCalculator } from '../calculators';
import { IHierarchy, IHoliday } from '../configuration/api';
import { IConfiguration, Configuration, ConfigurationFactory } from '../configuration';
import { ErrorKey } from '../configuration';
import { IHolidays } from './holidays';

export class Holidays implements IHolidays {

  // <editor-fold desc='private properties'>
  private hierarchyCalculator: IHierarchyCalculator;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor(language?: string) {
    this.hierarchyCalculator = new HierarchyCalculator(language || 'en_GB');
  }
  // </editor-fold>

  // <editor-fold desc='Public methods'>
  public getHierarchyTree(): Array<IHierarchy> {
    return this.hierarchyCalculator.getHierarchyTree(this.hierarchyLoader);
  }

  public getHolidays(path: string, year: number, deep?: boolean): Array<IHoliday> {
    const configuration = this.loadByHierarchy(path);
    return this.hierarchyCalculator.getHolidays(
      this.loadByHierarchy, path, year, deep);
  }

  public getSupportedLanguages(): Array<string> {
    return new Array<string>();
  }
  // </editor-fold>

  private hierarchyLoader(): string {
    const fileName = path.join(__dirname, `../assets/configurations.json`);
    return fs.readFileSync(fileName, 'utf-8');
  }

  public loadByHierarchy (hierarchy: string): IConfiguration {
    const root = hierarchy.split('/')[0];
    if (root.length === 0) {
      const result = new Configuration('', '');
      result.addError(ErrorKey.HIERARCHY_INVALID, 'root', hierarchy);
      return result;
    }

    const fileName = path.join(__dirname, `../assets/configurations/${root}.json`);
    return this.loadByFileName(fileName);
  }

  public loadByFileName(fileName: string): IConfiguration {
    const result = new Configuration('', '');
    if (!fs.existsSync(fileName)) {
      result.addError(ErrorKey.FILE_NOT_FOUND, 'root', fileName);
      return result;
    }

    let data: string;
    try {
      data = fs.readFileSync(fileName, 'utf-8');
    } catch (error) {
      result.addError(ErrorKey.COULD_NOT_READ_FILE, 'root', fileName, error);
      return result;
    }

    let obj: any;
    try {
      obj = JSON.parse(data);
    } catch (error) {
      result.addError(ErrorKey.INVALID_FILE_CONTENTS, 'root', fileName, error);
      return result;
    }

    return new ConfigurationFactory().loadConfiguration('root', obj);
  }

}
