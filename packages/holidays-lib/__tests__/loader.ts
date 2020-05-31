import * as fs from 'fs';
import * as path from 'path';

import { ConfigurationFactory } from '../src/configuration/factories/configuration-factory';
import { IConfiguration } from '../src/configuration/configuration';

export class Loader {
  public static loadConfiguration(fileName: string): IConfiguration {
    const fullPath = path.join(__dirname, fileName);
    const data = fs.readFileSync(fullPath, 'utf-8');
    return new ConfigurationFactory().loadConfigurationFromString('root', data);
  }
}
