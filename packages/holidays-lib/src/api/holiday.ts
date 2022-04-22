/**
 * The calculated result of a holiday
 */
export interface IHoliday {

  /**
   * The date of the holiday. This is the calculated value after eventually moving a fixed date holiday
   */
  date: Date;

  /**
   * The full path of the hierarchy for which this holiday is defined
   */
  fullPath: string;

  /**
   * The identification of the hierarchy for which this holiday is defined
   */
  hierarchy: string;

  /**
   * The identifier of the holiday definition
   */
  key: string;

  /**
   * The translated name of the holiday
   */
  name: string;
}
