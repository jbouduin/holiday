import { IslamicHolidayType } from './islamic-holiday-type';
import { Holiday } from './holiday';

export interface IslamicHoliday extends Holiday {
  type: IslamicHolidayType;
}
