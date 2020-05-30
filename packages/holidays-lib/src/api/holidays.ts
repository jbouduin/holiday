import { IHierarchy, IHoliday } from '../configuration/api';

export interface IHolidays {
  getHierarchyTree(): Array<IHierarchy>;
  getHolidays(path: string, year: number, deep?: boolean): Array<IHoliday>;
  getSupportedLanguages(): Array<string>;
}
