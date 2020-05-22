import { IFixed } from './fixed';
import { IBaseHoliday } from './base-holiday';
import { RelativeToFixedType } from './relative-to-fixed-type';
import { When } from './when';

export interface IRelativeToFixed extends IBaseHoliday {
  type: RelativeToFixedType;
  date: IFixed;
  days: number;
  when: When;
}
