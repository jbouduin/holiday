import { HebrewHolidayType } from './hebrew-holiday-type';
import { Holiday } from './holiday';
import { ITypedHoliday } from './typed-holiday';

export interface HebrewHoliday extends Holiday, ITypedHoliday<HebrewHolidayType> { }
