import { Weekday, When, Which } from '../types';
import { IRelation } from './relation';

export interface IRelationWhichWeekdayWhen extends IRelation {
  weekday: Weekday;
  when: When;
  which: Which;
}
