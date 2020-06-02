import { promises as fs } from 'fs';
import * as path from 'path';

import { IFileProvider } from '@jbouduin/holidays-lib';

export class FileProvider implements IFileProvider {

  // <editor-fold desc='Private properties'>
  private assetsPath: string;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor(assetsPath: string) {
    this.assetsPath = path.isAbsolute(assetsPath) ?
      assetsPath :
      path.join(__dirname, assetsPath);
  }
  // </editor-fold>

  // <editor-fold desc='IFileProvider interface methods'>
  public loadConfiguration(rootHierarchy: string): Promise<string> {
    const fileName = `${this.assetsPath}/configurations/${rootHierarchy}.json`;
    return fs.readFile(fileName, 'utf-8');
  }

  public loadHierarchies(): Promise<string> {
    const fileName = `${this.assetsPath}/configurations.json`;
    return fs.readFile(fileName, 'utf-8');
  }

  public loadHierarchyTranslations(language?: string): Promise<string> {
    const fileName = language ?
      `${this.assetsPath}/translations/hierarchy.${language}.json` :
      `${this.assetsPath}/translations/hierarchy.json`;
    return fs.readFile(fileName, 'utf-8');
  }

  public loadLanguages(): Promise<string> {
    const fileName = `${this.assetsPath}/languages.json`;
    return fs.readFile(fileName, 'utf-8');
  }

  public loadHolidayTranslations(language?: string): Promise<string> {
    const fileName = language ?
      `${this.assetsPath}/translations/holiday.${language}.json` :
      `${this.assetsPath}/translations/holiday.json`;
    return fs.readFile(fileName, 'utf-8');
  }
  // </editor-fold>
}
