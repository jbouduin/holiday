import { ChristianHolidayType } from './christian-holiday-type';
import { ChronologyType } from './chronology-type';
import { MoveableHoliday } from './moveable-holiday';
import { TypedHoliday } from './typed-holiday';

export interface ChristianHoliday extends MoveableHoliday, TypedHoliday<ChristianHolidayType> {
  chronologyType: ChronologyType;
}
