import * as fs from 'fs';
import * as glob from 'glob';
import * as convert from 'xml-js';
import * as commandLineArgs from 'command-line-args';

import { IConfiguration, ConfigurationFactory } from '../src/configuration';
import { IHierarchy } from '../src/api/hierarchy';

class Hierarchy implements IHierarchy {

  // <editor-fold desc='IHierarchy interface properties'>
  public code: string;
  public description: string;
  public children: Array<IHierarchy> | undefined;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor(code: string, description: string) {
    this.code = code;
    this.description = description;
  }
  // </editor-fold>
}

class Main {

  private commandLineOptions = [
    { name: 'input', alias: 'i', type: String }
  ];

  // <editor-fold desc='Main method'>
  public execute(args: Array<any>) {
    let params: any;
    try {
      params = commandLineArgs(this.commandLineOptions);
    } catch(error) {
      console.error(error);
      return
    }
    const pattern = `${params.input}/*.json`;
    const files = glob(
      pattern,
      (err: Error | null, files: Array<string>) => {
        if (err) {
          console.log(err);
        }
        if (files.length === 0) {
          console.error('no files found');
        } else {
          let cnt = 0;
          const hierarchies = new Array<IHierarchy>();

          files.forEach( (file: any) => {
            const hierarchy = this.processFile(file);
            if (hierarchy) {
              hierarchies.push(hierarchy);
            }
            cnt++;
            console.log(file);
          });
          console.log(`processed ${cnt} files`);
          fs.writeFile(`${params.input}/../configurations.json`, JSON.stringify(hierarchies, null, 2), (err) => {} );
        }
      }
    );
  }
  // </editor-fold>

  // <editor-fold desc='Private methods'>
  private processFile(fileName: string): IHierarchy | undefined {
    const configuration = new ConfigurationFactory().loadByFileName(fileName);
    return this.processConfiguration(configuration);
  }

  private processConfiguration(configuration: IConfiguration): IHierarchy {
    const hierarchy = new Hierarchy(configuration.hierarchy, configuration.description);
    if (configuration.subConfigurations.length > 0)
    {
      hierarchy.children = configuration.subConfigurations.map( (sub: IConfiguration) => this.processConfiguration(sub));
    }
    return hierarchy;
  }
  // </editor-fold>
}

new Main().execute(process.argv);
