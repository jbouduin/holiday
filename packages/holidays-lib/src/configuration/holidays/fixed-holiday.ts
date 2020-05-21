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

  public validate(): Array<string> {
    const result = new Array<string>();
    if (!this.key) {
      result.push('Fixed holiday has no key');
    }
    if (this.month === undefined) {
      result.push(`Fixed holiday '${this.key}'' has no month`);
    }
    if (!this.day || this.day < 1 || this.day > 31) {
      result.push(`Fixed holiday '${this.key}' has no valid day`);
    }
    return result;
  }
  // </editor-fold>
}
