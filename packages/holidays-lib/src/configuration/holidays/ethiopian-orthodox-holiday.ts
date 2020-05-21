import { EthiopianOrthodoxHolidayType } from './ethiopian-orthodox-holiday-type';
import { IHoliday, Holiday } from './holiday';
import { ITypedHoliday } from './typed-holiday';

export interface IEthiopianOrthodoxHoliday extends IHoliday, ITypedHoliday<EthiopianOrthodoxHolidayType> { }

export class EthiopianOrthodoxHoliday extends Holiday implements IEthiopianOrthodoxHoliday {
  // <editor-fold desc='ITypedHoliday interface properties'>
  public type: EthiopianOrthodoxHolidayType;
  // </editor-fold>

  public constructor(type: EthiopianOrthodoxHolidayType) {
    super();
    this.type = type;
  }
  // </editor-fold>

  // <editor-fold desc='Abstract method implementations'>
  public get translationKey(): string {
    return EthiopianOrthodoxHolidayType[this.type];
  }

  public validate(): Array<string> {
    const result = new Array<string>();
    if (!this.type) {
      result.push('Ethiopian-orthodox holiday has no type');
    }
    return result;
  }
  // </editor-fold>
}
