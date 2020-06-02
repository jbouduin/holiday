import { promises as fs } from 'fs';
import * as path from 'path';

import { IFileProvider } from '../../src/api';

export class FileProvider implements IFileProvider {

  // <editor-fold desc='Private properties'>
  private assetsPath: string;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor(assetsPath: string) {
    this.assetsPath = assetsPath;
  }
  // </editor-fold>

  // <editor-fold desc='IFileProvider interface methods'>
  public loadConfiguration(rootHierarchy: string): Promise<string> {
    const fileName = path.join(__dirname, `${this.assetsPath}/configurations/${rootHierarchy}.json`);
    return fs.readFile(fileName, 'utf-8');
  }

  public loadHierarchies(): Promise<string> {
    const fileName = path.join(__dirname, `${this.assetsPath}/configurations.json`);
    return fs.readFile(fileName, 'utf-8');
  }

  public loadHierarchyTranslations(language?: string): Promise<string> {
    const fileName = language ?
      path.join(__dirname, `${this.assetsPath}/translations/hierarchy.${language}.json`) :
      path.join(__dirname, `${this.assetsPath}/translations/hierarchy.json`);
    return fs.readFile(fileName, 'utf-8');
  }

  public loadLanguages(): Promise<string> {
    const fileName = path.join(__dirname, `${this.assetsPath}/languages.json`);
    return fs.readFile(fileName, 'utf-8');
  }

  public loadHolidayTranslations(language?: string): Promise<string> {
    const fileName = language ?
      path.join(__dirname, `${this.assetsPath}/translations/holiday.${language}.json`) :
      path.join(__dirname, `${this.assetsPath}/translations/holiday.json`);
    return fs.readFile(fileName, 'utf-8');
  }
  // </editor-fold>
}
