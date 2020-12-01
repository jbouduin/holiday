import { IFix, IBetweenFixedDates, IFixedDate, IFixedWeekday } from '../configuration';
import { IRelation, IRelationWeekday, IRelationWhichWeekdayWhen } from '../configuration';
import { IRelativeHoliday } from '../configuration';
import { HolidayType, When } from '../configuration';
import { IBaseCalculator, BaseCalculator } from './base-calculator';

export interface IRelativeHolidayCalculator extends IBaseCalculator<IRelativeHoliday<IRelation, IFix>> { }

export class RelativeHolidayCalculator extends BaseCalculator<IRelativeHoliday<IRelation, IFix>> implements IRelativeHolidayCalculator {

  //#region Constructor
  public constructor() {
    super();
  }
  //#endregion

  //#region Abstract method implementation
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
  //#endregion

  //#region Private methods
  private calculateRelativeBetween(
    holiday: IRelativeHoliday<IRelationWeekday, IBetweenFixedDates>,
    year: number): Date | undefined {

    const from = this.calendarHelper.calculateFixedDate(holiday.fix.from, year);
    // const to = this.calendarHelper.calculateFixedDate(holiday.fix.to, year);

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

    return this.applyRelation(
      holiday.relation,
      this.calendarHelper.calculateFixedDate(holiday.fix, year)
    );

  }

  private calculateRelativeToWeekday(
    holiday: IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday>,
    year: number): Date | undefined  {

    return this.applyRelation(
      holiday.relation,
      this.calendarHelper.calculateFixedWeekday(holiday.fix, year)
    );
  }

  private applyRelation(relation: IRelationWhichWeekdayWhen, date: Date): Date {
    const dayOfFix = date.getDay();
    let diff = 0;

    if (relation.when === When.BEFORE )
    {
      diff = dayOfFix >= relation.weekday ?
        relation.weekday - dayOfFix :
        relation.weekday - dayOfFix - 7;
    } else {
      diff = dayOfFix > relation.weekday ?
          relation.weekday - dayOfFix + 7:
          relation.weekday - dayOfFix;
    }

    return this.calendarHelper.addDays(date, diff + (relation.which * 7 * relation.when));
  }
  //#endregion
}
