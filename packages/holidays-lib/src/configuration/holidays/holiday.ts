import { HolidayCycleType } from './holiday-cycle-type';
import { HolidayType } from './holiday-type';

export interface Holiday {
  validFrom: number;
  validTo: number;
  holidayCycleType: HolidayCycleType; // TODO initial EVERY_YEAR
  translationKey: string;
  holidayType: HolidayType; // TODO initial OFFICIAL_HOLIDAY
}
