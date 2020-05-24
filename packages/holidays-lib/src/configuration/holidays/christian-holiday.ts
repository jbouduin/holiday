import { HolidayType } from './holiday-type';
import { ChristianHolidayType } from './christian-holiday-type';
import { ChronologyType } from './chronology-type';
import { CycleType }  from './cycle-type';
import { HolidayStatus } from './holiday-status';
import { IBaseHoliday, BaseHoliday } from './base-holiday';
import { IMoveable } from './moveable';
import { IMovingCondition } from './moving-condition';

export interface IChristianHoliday extends IBaseHoliday<ChristianHolidayType>, IMoveable {
  chronology: ChronologyType;
}

export class ChristianHoliday extends BaseHoliday<ChristianHolidayType> implements IChristianHoliday {

  // <editor-fold desc='IChristianHoliday interface properties'>
  public chronology: ChronologyType;
  // </editor-fold>

  // <editor-fold desc='IMoveable interface properties'>
  public movingConditions: Array<IMovingCondition>;
  // </editor-fold>

  // <editor-fold desc='Constructor'>
  public constructor(key: ChristianHolidayType, chronology?: ChronologyType) {
    super(HolidayType.CHRISTIAN, key);
    this.movingConditions = new Array<IMovingCondition>();
    this.chronology = chronology || ChronologyType.GREGORIAN;
  }
  // </editor-fold>

  // <editor-fold desc='Abstract method implementations'>
  public get translationKey(): string {
    return ChristianHolidayType[this.key];
  }
  // </editor-fold>
}
