import { IFixedWeekday } from '../specifics';
import { CycleType, HolidayStatus, HolidayType, Weekday, When } from '../types';
import { IBaseRelativeHoliday, BaseRelativeHoliday } from './base-relative-holiday';

export interface IRelativeToWeekdayHoliday extends IBaseRelativeHoliday<IFixedWeekday> { }

export class RelativeToWeekdayHoliday extends BaseRelativeHoliday<IFixedWeekday> implements IRelativeToWeekdayHoliday {

   // <editor-fold desc='Constructor & C°'>
   public constructor(
     key: string,
     holidayStatus: HolidayStatus,
     cycleType: CycleType,
     validFrom: number,
     validTo: number,
     fix: IFixedWeekday,
     when: When,
     weekday: Weekday) {
     super(
       HolidayType.RELATIVE_TO_WEEKDAY,
       key,
       holidayStatus,
       cycleType,
       validFrom,
       validTo,
       fix,
       when,
       weekday);
   }
   // </editor-fold>

   // <editor-fold desc='Abstract methods implementation'>
   public get translationKey(): string {
     return this.key;
   }

   public validateFix(): Array<string> {
     const result = new Array<string>();

     // TODO: this is a copy from fix-weekday-holiday validation
     if (this.fix.which === undefined) {
       result.push(`Fixed weekday holiday '${this.key}'' has no which`);
     }

     if (this.fix.weekday === undefined) {
       result.push(`Fixed weekday holiday '${this.key}'' has no valid weekday`);
     }

     if (this.fix.month === undefined) {
       result.push(`Fixed holiday '${this.key}'' has no valid month`);
     }
     return result;
   }
   // </editor-fold>
}
