import { SubstituteWith, Weekday } from '../types';

export interface IMovingCondition {
  substitute: Weekday;
  with: SubstituteWith;
  weekday: Weekday;
}
