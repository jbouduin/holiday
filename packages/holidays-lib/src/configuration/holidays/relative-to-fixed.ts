import { IFixed } from './fixed';
import { Holiday } from './holiday';
import { RelativeToFixedType } from './relative-to-fixed-type';
import { When } from './when';

export interface RelativeToFixed extends Holiday {
  type: RelativeToFixedType;
  date: IFixed;
  days: number;
  when: When;
}
