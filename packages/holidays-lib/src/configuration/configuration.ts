import { Holiday } from './holidays/holiday';

export interface Configuration {
  hierarchy: string;
  translationKey: string
  holidays: Array<Holiday>;
  subConfiguration?: Array<Configuration>;
}
