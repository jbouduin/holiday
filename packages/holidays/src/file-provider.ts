import { promises as fs } from 'fs';
import * as path from 'path';

import { IFileProvider } from '@jbouduin/holidays-lib';

export class FileProvider implements IFileProvider {

  // <editor-fold desc='IFileProvider interface methods'>
  loadHierarchies(): Promise<string> {
    const fileName = path.join(__dirname, '../assets/configurations.json');
    return fs.readFile(fileName, 'utf-8');
  }

  loadConfiguration(rootHierarchy: string): Promise<string> {
    const fileName = path.join(__dirname, `../assets/configurations/${rootHierarchy}.json`);
    return fs.readFile(fileName, 'utf-8');
  }
  // </editor-fold>
}
