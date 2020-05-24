import { IFixedWeekday } from './fixed-weekday';
import { IBaseRelativeHoliday, BaseRelativeHoliday } from './base-relative-holiday';
import { HolidayType } from './holiday-type';
import { Month } from './month';
import { Weekday } from './weekday';
import { When } from './when';

export interface IRelativeToWeekdayHoliday extends IBaseRelativeHoliday<IFixedWeekday> { }

export class RelativeToWeekdayHoliday extends BaseRelativeHoliday<IFixedWeekday> implements IRelativeToWeekdayHoliday {

   // <editor-fold desc='Constructor & C°'>
   public constructor(key: string, fix: IFixedWeekday, when: When, weekday: Weekday) {
     super(HolidayType.RELATIVE_TO_WEEKDAY, key, fix, when, weekday);
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

   // <editor-fold desc='Base class methods override'>
   public validate(): Array<string> {
     const result = super.validate();
     if (this.key === '') {
       result.push('holiday has no valid key');
     }
     if (this.when === undefined) {
       result.push(`relative to date holiday '${this.key}'' has no valid when`);
     }

     if (this.weekday === undefined) {
       result.push(`relative to date holiday '${this.key}'' has no valid weekday`);
     }
     return result;
   }
   // </editor-fold>
}
//
//
//   // <editor-fold desc='Constructor'>
//   public constructor() {
//
//   }
//   // </editor-fold>
// }
