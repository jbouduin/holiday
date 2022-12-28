import { IHierarchy } from './hierarchy';
import { IHoliday } from './holiday';

export interface IHolidays {
  /**
   * Get the hierarchy tree
   */
  getHierarchyTree(): Promise<Array<IHierarchy>>;

  /**
   * Calculate the holidays for the given hierarchy, including its parent hierarchies, during the given year
   *
   * @param path the full path of the hierarchy for which the holidays have to be calculated
   * @param year the year for which the holidays have to be calculated
   * @param deep if set to yes, the holidays of all sub-hierarchies are included in the result
   */
  getHolidays(path: string, year: number, deep?: boolean): Promise<Array<IHoliday>>;

  /**
   * Get the list of supported languages
   */
  getSupportedLanguages(): Promise<Array<string>>;
}
