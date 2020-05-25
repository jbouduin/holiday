import * as path from 'path';

import { Configuration } from '../../src/configuration';
import { IFixedWeekdayHoliday } from '../../src/configuration';
import { Which } from '../../src/configuration';
import { Weekday } from '../../src/configuration';
import { Month } from '../../src/configuration';

const dataRoot = './data/fixed-weekday-holiday';

describe.each([
  ['which.first', Which.FIRST],
  ['which.second', Which.SECOND],
  ['which.third', Which.THIRD],
  ['which.fourth', Which.FOURTH],
  ['which.last', Which.LAST]
])('fixed weekday which', (fileName: string, expected: Which) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const validation = configuration.validate();
  test(`${fileName} - validation length`, () => expect(validation.length).toBe(0));
  const holiday: IFixedWeekdayHoliday = configuration.holidayCollection[0] as IFixedWeekdayHoliday;
  test(`${fileName} - which`, () => expect(Which[holiday.which]).toStrictEqual(Which[expected]));
})

describe.each([
  ['weekday.monday', Weekday.MONDAY],
  ['weekday.tuesday', Weekday.TUESDAY],
  ['weekday.wednesday', Weekday.WEDNESDAY],
  ['weekday.thursday', Weekday.THURSDAY],
  ['weekday.friday', Weekday.FRIDAY],
  ['weekday.saturday', Weekday.SATURDAY],
  ['weekday.sunday', Weekday.SUNDAY]
])('fixed weekday weekday', (fileName: string, expected: Weekday) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const validation = configuration.validate();
  test(`${fileName} - validation length`, () => expect(validation.length).toBe(0));
  const holiday: IFixedWeekdayHoliday = configuration.holidayCollection[0] as IFixedWeekdayHoliday;
  test(`${fileName} - weekday`, () => expect(Weekday[holiday.weekday]).toBe(Weekday[expected]));
})

describe.each([
  ['month.january', Month.JANUARY],
  ['month.february', Month.FEBRUARY],
  ['month.march', Month.MARCH],
  ['month.april', Month.APRIL],
  ['month.may', Month.MAY],
  ['month.june', Month.JUNE],
  ['month.july', Month.JULY],
  ['month.august', Month.AUGUST],
  ['month.september', Month.SEPTEMBER],
  ['month.october', Month.OCTOBER],
  ['month.november', Month.NOVEMBER],
  ['month.december', Month.DECEMBER],
])('fixed weekday month', (fileName: string, expected: Month) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const validation = configuration.validate();
  test(`${fileName} - validation length`, () => expect(validation.length).toBe(0));
  const holiday: IFixedWeekdayHoliday = configuration.holidayCollection[0] as IFixedWeekdayHoliday;
  test(`${fileName} - month`, () => expect(Month[holiday.month]).toBe(Month[expected]));
})

describe.each([
  ['invalid.key-empty'],
  ['invalid.month-empty'],
  ['invalid.month-missing'],
  ['invalid.month-value'],
  ['invalid.weekday-empty'],
  ['invalid.weekday-missing'],
  ['invalid.weekday-value'],
  ['invalid.which-empty'],
  ['invalid.which-missing'],
  ['invalid.which-value']
])('fixed weekday invalid configurations', (fileName: string) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const validation = configuration.validate();
  test(`${fileName} - validation length`, () => expect(validation.length).toBe(1));
})

describe('Fixed weekday holiday translation key', () => {
  const file = path.join(__dirname, `${dataRoot}/translation-key.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`translation-key - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday = configuration.holidayCollection[0];
  test(`translation-key - key`, () => expect(holiday.translationKey).toBeDefined());
});
