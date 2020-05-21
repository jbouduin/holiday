import { Holiday } from './holiday';
import { MovingCondition} from './moving-condition';

export interface MoveableHoliday {
  movingConditions: Array<MovingCondition>;
}
