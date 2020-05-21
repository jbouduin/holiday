import { IFixed } from './fixed';
import { IHoliday, Holiday } from './holiday';
import { IMoveable } from './moveable';
import { IMovingCondition } from './moving-condition';
import { Month, MonthKeyStrings } from './month';

export interface IFixedHoliday extends IHoliday, IFixed, IMoveable { }

export class FixedHoliday extends Holiday implements IFixedHoliday {

  // <editor-fold desc='IMoveable interface properties'>
  public movingConditions: Array<IMovingCondition>;
  // </editor-fold>

  // <editor-fold desc='Constructor'>
  public constructor(public key: string, public month: Month, public day: number) {
    super();
    this.movingConditions = new Array<IMovingCondition>();
  }
  // </editor-fold>

  // <editor-fold desc='Abstract method implementations'>
  public get translationKey(): string {
    return this.key;
  }
  // </editor-fold>
}
