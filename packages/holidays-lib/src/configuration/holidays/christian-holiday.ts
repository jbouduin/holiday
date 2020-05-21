import { ChristianHolidayType } from './christian-holiday-type';
import { ChronologyType } from './chronology-type';
import { Holiday } from './holiday';
import { IMoveable } from './moveable';
import { IMovingCondition } from './moving-condition';
import { ITypedHoliday } from './typed-holiday';

export interface IChristianHoliday extends IMoveable, ITypedHoliday<ChristianHolidayType> {
  chronologyType: ChronologyType;
}

export class ChristianHoliday extends Holiday implements IChristianHoliday {

  // <editor-fold desc='IChristianHoliday interface properties'>
  public chronologyType: ChronologyType;
  // </editor-fold>

  // <editor-fold desc='ITypedHoliday interface properties'>
  public type: ChristianHolidayType;
  // </editor-fold>

  // <editor-fold desc='IMoveable interface properties'>
  public movingConditions: Array<IMovingCondition>;
  // </editor-fold>

  // <editor-fold desc='Constructor'>
  public constructor(type: ChristianHolidayType, chronologyType?: ChronologyType) {
    super();
    this.movingConditions = new Array<IMovingCondition>();
    this.type = type;
    this.chronologyType = chronologyType || ChronologyType.GREGORIAN;
  }
  // </editor-fold>

  // <editor-fold desc='Abstract method implementations'>
  public get translationKey(): string {
    return ChristianHolidayType[this.type];
  }
  // </editor-fold>
}
