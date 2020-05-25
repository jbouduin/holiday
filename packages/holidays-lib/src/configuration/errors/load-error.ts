import { ErrorKeys } from './error-keys';

export interface ILoadError {
  key: string;
  location: string;
  args: Array<any>;
}

export class LoadError implements ILoadError {

  // <editor-fold desc='ILoadError interface properties'>
  public key: string;
  public location: string;
  public args: Array<any>;
  // </editor-fold>

  // <editor-fold desc='Constructor'>
  public constructor(key: string, location: string, ...args: Array<any>) {
    this.key = key;
    this.location = location;
    this.args = args;
  }
  // </editor-fold>
}
