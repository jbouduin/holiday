import { IHoliday } from './holiday';
import { IMovingCondition} from './moving-condition';

export interface IMoveable extends IHoliday {
  movingConditions: Array<IMovingCondition>;
}
