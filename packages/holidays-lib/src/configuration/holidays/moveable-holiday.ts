import { Holiday } from './holiday';
import { MovingCondition} from './moving-condition';

export interface MoveableHoliday extends Holiday {
  movingConditions: Array<MovingCondition>;
}
