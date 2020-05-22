import { HebrewHolidayType } from './hebrew-holiday-type';
import { IBaseHoliday } from './base-holiday';
import { ITypedHoliday } from './typed-holiday';

export interface IHebrewHoliday extends IBaseHoliday, ITypedHoliday<HebrewHolidayType> { }
