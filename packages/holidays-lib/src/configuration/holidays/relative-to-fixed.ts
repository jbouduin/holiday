import { IFixedDate } from './fixed-date';
import { IBaseHoliday } from './base-holiday';
import { RelativeToFixedType } from './relative-to-fixed-type';
import { When } from './when';

export interface IRelativeToFixed extends IBaseHoliday<string> {
  type: RelativeToFixedType;
  date: IFixedDate;
  days: number;
  when: When;
}
