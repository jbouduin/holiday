import { Fixed } from './fixed';
import { Holiday } from './holiday';
import { RelativeToFixedType } from './relative-to-fixed-type';
import { When } from './when';

export interface RelativeToFixed extends Holiday {
  type: RelativeToFixedType;
  date: Fixed;
  days: number;
  when: When;
}
