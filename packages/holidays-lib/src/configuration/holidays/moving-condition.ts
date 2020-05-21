import { SubstituteWith } from './substitute-with';
import { Weekday } from './weekday';

export interface IMovingCondition {
  substitute: Weekday;
  with: SubstituteWith;
  weekday: Weekday;
}
