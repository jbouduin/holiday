import { ChristianHolidayType } from './christian-holiday-type';
import { ChronologyType } from './chronology-type';
import { Holiday } from './holiday';
import { IMoveable } from './moveable';
import { IMovingCondition } from './moving-condition';
import { ITypedHoliday } from './typed-holiday';

export interface IChristianHoliday extends IMoveable, ITypedHoliday<ChristianHolidayType> {
  chronology: ChronologyType;
}

export class ChristianHoliday extends Holiday implements IChristianHoliday {

  // <editor-fold desc='IChristianHoliday interface properties'>
  public chronology: ChronologyType;
  // </editor-fold>

  // <editor-fold desc='ITypedHoliday interface properties'>
  public type: ChristianHolidayType;
  // </editor-fold>

  // <editor-fold desc='IMoveable interface properties'>
  public movingConditions: Array<IMovingCondition>;
  // </editor-fold>

  // <editor-fold desc='Constructor'>
  public constructor(type: ChristianHolidayType, chronology?: ChronologyType) {
    super();
    this.movingConditions = new Array<IMovingCondition>();
    this.type = type;
    this.chronology = chronology || ChronologyType.GREGORIAN;
  }
  // </editor-fold>

  // <editor-fold desc='Abstract method implementations'>
  public get translationKey(): string {
    return ChristianHolidayType[this.type];
  }

  public validate(): Array<string> {
    const result = new Array<string>();
    if (this.type === undefined) {
      result.push('Christian holiday has no type');
    }
    return result;
  }
  // </editor-fold>
}
