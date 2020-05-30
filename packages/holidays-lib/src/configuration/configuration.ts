import { ILoadError, LoadError } from './errors';
import { IBaseHoliday } from './holidays';

export interface IConfiguration {
  readonly hierarchy: string;
  readonly description: string;
  readonly errors: Array<ILoadError>;
  readonly holidays: Array<IBaseHoliday<any>>;
  readonly subConfigurations: Array<IConfiguration>;
  addError(key: string, location: string, ...args: Array<any>): void;
}

export class Configuration implements IConfiguration {

  // <editor-fold desc='IConfiguration interface properties'>
  public readonly hierarchy: string;
  public readonly description: string;
  public readonly errors: Array<ILoadError>;
  public readonly holidays: Array<IBaseHoliday<any>>;
  public readonly subConfigurations: Array<IConfiguration>;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor(hierarchy: string, description: string) {
    this.hierarchy = hierarchy;
    this.description = description;
    this.errors = new Array<ILoadError>();
    this.holidays = new Array<IBaseHoliday<any>>();
    this.subConfigurations = new Array<IConfiguration>();

  }
  // </editor-fold>

  // <editor-fold desc='IConfiguration interface methods'>
  public addError(key: string, location: string, ...args: Array<any>): void {
    this.errors.push(new LoadError(key, location, args));
  }
  // </editor-fold>

}
