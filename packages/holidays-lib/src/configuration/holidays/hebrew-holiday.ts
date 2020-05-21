import { HebrewHolidayType } from './hebrew-holiday-type';
import { Holiday } from './holiday';
import { TypedHoliday } from './typed-holiday';

export interface HebrewHoliday extends Holiday, TypedHoliday<HebrewHolidayType> { }
