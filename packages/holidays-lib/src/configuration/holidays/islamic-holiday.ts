import { IslamicHolidayType } from './islamic-holiday-type';
import { IHoliday, Holiday } from './holiday';
import { ITypedHoliday } from './typed-holiday';

export interface IIslamicHoliday extends IHoliday, ITypedHoliday<IslamicHolidayType> { }

export class IslamicHoliday extends Holiday implements IIslamicHoliday {
  // <editor-fold desc='ITypedHoliday interface properties'>
  public type: IslamicHolidayType;
  // </editor-fold>

  public constructor(type: IslamicHolidayType) {
    super();
    this.type = type;
  }
  // </editor-fold>

  // <editor-fold desc='Abstract method implementations'>
  public get translationKey(): string {
    return IslamicHolidayType[this.type];
  }

  public validate(): Array<string> {
    const result = new Array<string>();
    if (this.type === undefined) {
      result.push('Islamic holiday has no type');
    }
    return result;
  }
  // </editor-fold>
}
