import * as path from 'path';

import { Configuration, IRelativeBetweenFixedHoliday, Weekday } from '../../src/configuration';
const dataRoot = './data/relative-between-fixed';

describe.each([
  ['weekday.monday', Weekday.MONDAY],
  ['weekday.tuesday', Weekday.TUESDAY],
  ['weekday.wednesday', Weekday.WEDNESDAY],
  ['weekday.thursday', Weekday.THURSDAY],
  ['weekday.friday', Weekday.FRIDAY],
  ['weekday.saturday', Weekday.SATURDAY],
  ['weekday.sunday', Weekday.SUNDAY]
])('relative between fixed dates > weekday', (fileName: string, expected: Weekday) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const validation = configuration.validate();
  test(`${fileName} - validation length`, () => expect(validation.length).toBe(0));
  const holiday: IRelativeBetweenFixedHoliday = configuration.holidayCollection[0] as IRelativeBetweenFixedHoliday;
  test(`${fileName} - weekday`, () => expect(Weekday[holiday.weekday]).toBe(Weekday[expected]));
})

describe.each([
  // ['invalid.fix.empty'],
  // ['invalid.fix.missing'],
  ['invalid.key-empty'],
  ['invalid.weekday-empty'],
  ['invalid.weekday-missing'],
  ['invalid.weekday-value']
])('relative between fixed dates > invalid configurations', (fileName: string) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const validation = configuration.validate();
  test(`${fileName} - validation length`, () => expect(validation.length).toBe(1));
})

describe('relative between fixed dates > translationkey', () => {
  const file = path.join(__dirname, `${dataRoot}/translation-key.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`translation-key - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday = configuration.holidayCollection[0];
  test(`translation-key - key`, () => expect(holiday.translationKey).toBeDefined());
});
