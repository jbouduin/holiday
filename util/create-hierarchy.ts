import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import * as commandLineArgs from 'command-line-args';

import { IConfiguration, ConfigurationFactory } from '../packages/holidays-lib/src/configuration';
import { IFileProvider, IHierarchy } from '../packages/holidays-lib/src/api/';
import { FileProvider } from '../packages/holidays/src/file-provider';

class Hierarchy implements IHierarchy {

  //#region IHierarchy interface properties
  public code: string;
  public fullPath: string;
  public description: string;
  public children: Array<IHierarchy> | undefined;
  //#endregion

  //#region Constructor & C°
  public constructor(code: string, fullPath: string, description: string) {
    this.code = code;
    this.fullPath = fullPath;
    this.description = description;
  }
  //#endregion
}

class Main {

  private commandLineOptions = [
    { name: 'input', alias: 'i', type: String }
  ];

  //#region Main method
  public execute() {
    let params: any;
    try {
      params = commandLineArgs(this.commandLineOptions);
    } catch(error) {
      console.error(error);
      return
    }
    const pattern = `${params.input}/configurations/*.json`;
    const fileProvider: IFileProvider = new FileProvider(path.join(__dirname, params.input));
    glob(
      pattern,
      (err: Error | null, files: Array<string>) => {
        if (err) {
          console.log(err);
        }
        if (files.length === 0) {
          console.error('no files found');
        } else {
          let cnt = 0;

          const allFiles = files.map( (file: any) => {
            cnt++;
            console.log(file);
            return this.processFile(fileProvider, file);
          });
          Promise.all(allFiles).then(allHierarchies => {

            console.log(`processed ${cnt} files`);
            fs.writeFile(
              `${params.input}/configurations.json`,
              JSON.stringify(allHierarchies, null, 2),
              (err) => {
                if (err) {
                  console.log(err);
                }
              });
          });

        }
      }
    );
  }
  //#endregion

  //#region Private methods
  private async processFile(fileprovider: IFileProvider, fullFileName: string): Promise<IHierarchy> {
    const fileName = fullFileName.replace(/\\/g, '/').split('/').pop() || '';
    const hierarchy = fileName.split('.')[0];
    return fileprovider.loadConfiguration(hierarchy).then(asString => {
      const configuration = new ConfigurationFactory().loadConfigurationFromString('root', asString);
      return this.processConfiguration(configuration, '');
    });
  }

  private processConfiguration(configuration: IConfiguration, parentFullPath: string): IHierarchy {
    const fullPath = `${parentFullPath}${parentFullPath ? '/' : ''}${configuration.hierarchy}`;
    const hierarchy = new Hierarchy(configuration.hierarchy, fullPath, configuration.description);
    if (configuration.subConfigurations.length > 0)
    {
      hierarchy.children = configuration.subConfigurations.map( (sub: IConfiguration) => this.processConfiguration(sub, fullPath));
    }
    return hierarchy;
  }
  //#endregion
}

new Main().execute();
