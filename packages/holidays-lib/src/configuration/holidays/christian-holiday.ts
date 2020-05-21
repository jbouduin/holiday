import { ChristianHolidayType } from './christian-holiday-type';
import { ChronologyType } from './chronology-type';
import { MoveableHoliday } from './moveable-holiday';

export interface ChristianHoliday extends MoveableHoliday {
  type: ChristianHolidayType;
  chronologyType: ChronologyType;
}
