import { EthiopianOrthodoxHolidayType } from './ethiopian-orthodox-holiday-type';
import { Holiday } from './holiday';

export interface EthiopianOrthodoxHoliday extends Holiday {
  type: EthiopianOrthodoxHolidayType;
}
