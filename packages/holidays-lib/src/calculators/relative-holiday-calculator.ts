import { IFix, IBetweenFixedDates, IFixedDate, IFixedWeekday } from '../configuration';
import { IRelation, IRelationWeekday, IRelationWhichWeekdayWhen } from '../configuration';
import { IRelativeHoliday } from '../configuration';
import { HolidayType } from '../configuration';
import { IBaseCalculator, BaseCalculator } from './base-calculator';

export interface IRelativeHolidayCalculator extends IBaseCalculator<IRelativeHoliday<IRelation, IFix>> { }

export class RelativeHolidayCalculator extends BaseCalculator<IRelativeHoliday<IRelation, IFix>> implements IRelativeHolidayCalculator {

  // <editor-fold desc='Constructor'>
  public constructor() {
    super();
  }
  // </editor-fold>

  // <editor-fold desc='Abstract method implementation'>
  public calculateDate(holiday: IRelativeHoliday<IRelation, IFix>, year: number): Date | undefined {
    switch (holiday.holidayType) {
      case HolidayType.RELATIVE_BETWEEN_FIXED: {
        return this.calculateRelativeBetween(
          holiday as IRelativeHoliday<IRelationWeekday, IBetweenFixedDates>,
          year
        );
      }
      case HolidayType.RELATIVE_TO_DATE: {
        return this.calculateRelativeToDate(
          holiday as IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedDate>,
          year
        );
      }
      case HolidayType.RELATIVE_TO_WEEKDAY: {
        return this.calculateRelativeToWeekday(
          holiday as IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday>,
          year
        );
      }
    }
  }
  // </editor-fold>

  // <editor-fold desc='Private methods'>
  private calculateRelativeBetween(
    holiday: IRelativeHoliday<IRelationWeekday, IBetweenFixedDates>,
    year: number): Date | undefined {

    const from = this.calendarHelper.calculateFixedDate(holiday.fix.from, year);
    const to = this.calendarHelper.calculateFixedDate(holiday.fix.to, year);

    const dayOfFrom = from.getDay();
    const result = this.calendarHelper.addDays(from,
      (dayOfFrom > holiday.relation.weekday ?
        holiday.relation.weekday - dayOfFrom + 7:
        holiday.relation.weekday - dayOfFrom)
    );
    return result;
  }

  private calculateRelativeToDate(
    holiday: IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedDate>,
    year: number): Date | undefined {

    const fix = this.calendarHelper.calculateFixedDate(holiday.fix, year);
    // console.log('calculateRelativeToDate => fix', fix);
    return undefined;
  }

  private calculateRelativeToWeekday(
    holiday: IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday>,
    year: number): Date | undefined  {

    const fix = this.calendarHelper.calculateFixedWeekday(holiday.fix, year);
    // console.log('calculateRelativeToWeekday  => fix', fix);
    return undefined;
  }
  // </editor-fold>
}
