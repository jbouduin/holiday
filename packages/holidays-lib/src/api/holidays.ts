import { IHierarchy } from './hierarchy';
import { IHoliday } from './holiday';

export interface IHolidays {
  getHierarchyTree(): Promise<Array<IHierarchy>>;
  getHolidays(path: string, year: number, deep?: boolean): Promise<Array<IHoliday>>;
  getSupportedLanguages(): Promise<Array<string>>;
}
