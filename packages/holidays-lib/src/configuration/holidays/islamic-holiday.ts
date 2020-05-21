import { IslamicHolidayType } from './islamic-holiday-type';
import { IHoliday } from './holiday';
import { ITypedHoliday } from './typed-holiday';

export interface IslamicHoliday extends IHoliday, ITypedHoliday<IslamicHolidayType> { }
