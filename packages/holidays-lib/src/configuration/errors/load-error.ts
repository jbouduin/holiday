import { ErrorKey } from './error-key';

export interface ILoadError {
  key: string;
  location: string;
  args: Array<any>;
}

export class LoadError implements ILoadError {

  //#region ILoadError interface properties
  public key: string;
  public location: string;
  public args: Array<any>;
  //#endregion

  //#region Constructor
  public constructor(key: string, location: string, ...args: Array<any>) {
    this.key = key;
    this.location = location;
    this.args = args;
  }
  //#endregion
}
