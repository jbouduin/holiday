import * as path from 'path';

import { Configuration } from '../../src/configuration/configuration';
import { IFixedDateHoliday } from '../../src/configuration/holidays/fixed-date-holiday';
import { Month } from '../../src/configuration/holidays/month';

const dataRoot = './data/fixed-date-holiday';

describe.each([
  ['month-january', Month.JANUARY],
  ['month-february', Month.FEBRUARY],
  ['month-march', Month.MARCH],
  ['month-april', Month.APRIL],
  ['month-may', Month.MAY],
  ['month-june', Month.JUNE],
  ['month-july', Month.JULY],
  ['month-august', Month.AUGUST],
  ['month-september', Month.SEPTEMBER],
  ['month-october', Month.OCTOBER],
  ['month-november', Month.NOVEMBER],
  ['month-december', Month.DECEMBER],
])('fixed date month', (fileName: string, expected: Month) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const validation = configuration.validate();
  test(`${fileName} - validation length`, () => expect(validation.length).toBe(0));
  const holiday: IFixedDateHoliday = configuration.holidayCollection[0] as IFixedDateHoliday;
  test(`${fileName} - month`, () => expect(Month[holiday.month]).toBe(Month[expected]));
});

describe.each([
  ['invalid-day-missing', 1],
  ['invalid-day-out-of-range', 14],
  ['invalid-key-empty', 1],
  ['invalid-key-missing', 1],
  ['invalid-month-empty', 1],
  ['invalid-month-missing', 1],
  ['invalid-month-value', 1]
])('fixed date invalid configurations', (fileName: string, expected: number) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} - collection length`, () => expect(configuration.holidayCollection.length).toBe(expected));
  const validation = configuration.validate();
  test(`${fileName} - validation length`, () => expect(validation.length).toBe(expected));
})
