import { ChronologyType } from './chronology-type';
import { IBaseHoliday } from './base-holiday';

export interface RelativeToEasterSunday extends IBaseHoliday {
  chronologyType: ChronologyType;
  days: number;
}
