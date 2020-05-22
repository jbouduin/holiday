import { CycleType } from './cycle-type';
import { HolidayType } from './holiday-type';

export interface IBaseHoliday {
  cycleType: CycleType;
  holidayType: HolidayType;
  validFrom: number;
  validTo: number;
  readonly translationKey: string;
  validate(): Array<string>;
  // calculate(year: number): Date;
}

export abstract class BaseHoliday implements IBaseHoliday {

  // <editor-fold desc='Public static magic numbers'>
  public static undefinedValidFrom = -1;
  public static undefinedValidTo = -1;
  // </editor-fold>

  // <editor-fold desc='IHoliday interface members'>
  public validFrom: number;
  public validTo: number;
  public cycleType: CycleType;
  public holidayType: HolidayType;
  // </editor-fold>

  // <editor-fold desc='Abstract methods'>
  public abstract get translationKey(): string;
  public abstract validate(): Array<string>;
  // public abstract calculate(year: number): Date;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor() {
    this.cycleType = CycleType.EVERY_YEAR;
    this.holidayType = HolidayType.OFFICIAL_HOLIDAY;
    this.validFrom = BaseHoliday.undefinedValidFrom;
    this.validTo = BaseHoliday.undefinedValidTo;
  }
  // </editor-fold>
}
