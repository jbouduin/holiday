import { IBaseHoliday } from '../holidays';
import { ILoadError, LoadError } from '../errors';

export interface IFactoryResult<T extends IBaseHoliday<any>> {
  holiday?: T;
  errors: Array<ILoadError>;
}

export class FactoryResult<T extends IBaseHoliday<any>> implements IFactoryResult<T> {

  //#region IFactoryResult interface properties
  public holiday?: T;
  public errors: Array<ILoadError>;
  //#endregion

  //#region Constructor and C°
  public constructor(holiday: T | undefined, errors: Array<ILoadError>) {
    this.holiday = holiday;
    this.errors = errors;
  }
  //#endregion
}
