import { HebrewHolidayType } from './hebrew-holiday-type';
import { Holiday } from './holiday';

export interface HebrewHoliday extends Holiday {
  type: HebrewHolidayType;
}
