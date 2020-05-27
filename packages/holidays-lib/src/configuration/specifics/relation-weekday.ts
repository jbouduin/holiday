import { Weekday } from '../types';
import { IRelation } from './relation';

export interface IRelationWeekday extends IRelation {
  weekday: Weekday;
}
