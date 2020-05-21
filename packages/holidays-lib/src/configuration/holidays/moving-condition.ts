import { SubstituteWith } from './substitute-with';
import { Weekday } from './weekday';

export interface MovingCondition {
  substitute: Weekday;
  with: SubstituteWith;
  weekday: Weekday;
}
