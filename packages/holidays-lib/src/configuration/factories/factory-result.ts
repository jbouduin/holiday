import { IBaseHoliday } from '../holidays';
import { ILoadError, LoadError } from '../errors';

export interface IFactoryResult<T extends IBaseHoliday<any>> {
  holiday?: T;
  errors: Array<ILoadError>;
}

export class FactoryResult<T extends IBaseHoliday<any>> implements IFactoryResult<T> {

  // <editor-fold desc='IFactoryResult interface properties'>
  public holiday?: T;
  public errors: Array<ILoadError>;
  // </editor-fold>

  // <editor-fold desc='Constructor and C°'>
  public constructor(holiday: T | undefined, errors: Array<ILoadError>) {
    this.holiday = holiday;
    this.errors = errors;
  }
  // </editor-fold>
}