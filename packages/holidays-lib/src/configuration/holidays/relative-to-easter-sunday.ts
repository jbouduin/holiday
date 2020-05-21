import { ChronologyType } from './chronology-type';
import { Holiday } from './holiday';

export interface RelativeToEasterSunday extends Holiday {
  chronologyType: ChronologyType;
  days: number;
}
