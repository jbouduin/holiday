import { EthiopianOrthodoxHolidayType } from './ethiopian-orthodox-holiday-type';
import { Holiday } from './holiday';
import { ITypedHoliday } from './typed-holiday';

export interface EthiopianOrthodoxHoliday extends Holiday, ITypedHoliday<EthiopianOrthodoxHolidayType> { }
