import { Condition, MoveTo, Weekday } from '../types';

export interface IMove {
  condition: Condition;
  moveTo: MoveTo;
  weekday: Weekday;
}
