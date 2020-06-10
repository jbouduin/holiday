import { IBaseHoliday } from '../../configuration';

export class FilteredHoliday<T> {
  public hierarchy: string;
  public fullPath: string;
  public holiday: IBaseHoliday<T>;

  public constructor(hierarchy: string, fullPath: string, holiday: IBaseHoliday<T>) {
    this.hierarchy = hierarchy;
    this.fullPath = fullPath;
    this.holiday = holiday;
  }
}
