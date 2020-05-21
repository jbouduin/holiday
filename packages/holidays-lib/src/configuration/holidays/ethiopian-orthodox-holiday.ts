import { EthiopianOrthodoxHolidayType } from './ethiopian-orthodox-holiday-type';
import { Holiday } from './holiday';
import { TypedHoliday } from './typed-holiday';

export interface EthiopianOrthodoxHoliday extends Holiday, TypedHoliday<EthiopianOrthodoxHolidayType> { }
