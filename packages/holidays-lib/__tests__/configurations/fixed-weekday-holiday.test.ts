import * as path from 'path';

import { Configuration } from '../../src/configuration/configuration';
import { CycleType } from '../../src/configuration/holidays/cycle-type';
import { BaseHoliday } from '../../src/configuration/holidays/base-holiday';
import { IFixedWeekdayHoliday } from '../../src/configuration/holidays/fixed-weekday-holiday';

import { HolidayType } from '../../src/configuration/holidays/holiday-type';
import { Which } from '../../src/configuration/holidays/which';
import { Weekday } from '../../src/configuration/holidays/weekday';
import { Month } from '../../src/configuration/holidays/month';

const dataRoot = './data/fixed-weekday-holiday';

describe.each([
  ['which-first', Which.FIRST],
  ['which-second', Which.SECOND],
  ['which-third', Which.THIRD],
  ['which-fourth', Which.FOURTH],
  ['which-last', Which.LAST]
])('test which', (fileName: string, expected: Which) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${configuration.description} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const validation = configuration.validate();
  test(`${validation} - validation length`, () => expect(validation.length).toBe(0));
  const holiday: IFixedWeekdayHoliday = configuration.holidayCollection[0] as IFixedWeekdayHoliday;
  test(`${configuration.description} - which`, () => expect(holiday.which).toStrictEqual(expected));
})

describe.each([
  ['weekday-monday', Weekday.MONDAY],
  ['weekday-tuesday', Weekday.TUESDAY],
  ['weekday-wednesday', Weekday.WEDNESDAY],
  ['weekday-thursday', Weekday.THURSDAY],
  ['weekday-friday', Weekday.FRIDAY],
  ['weekday-saturday', Weekday.SATURDAY],
  ['weekday-sunday', Weekday.SUNDAY]
])('test weekday', (fileName: string, expected: Weekday) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${configuration.description} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const validation = configuration.validate();
  test(`${configuration.description} - validation length`, () => expect(validation.length).toBe(0));
  const holiday: IFixedWeekdayHoliday = configuration.holidayCollection[0] as IFixedWeekdayHoliday;
  test(`${configuration.description} - weekday`, () => expect(holiday.weekday).toStrictEqual(expected));
})

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
])('test month', (fileName: string, expected: Month) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${configuration.description} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const validation = configuration.validate();
  test(`${configuration.description} - validation length`, () => expect(validation.length).toBe(0));
  const holiday: IFixedWeekdayHoliday = configuration.holidayCollection[0] as IFixedWeekdayHoliday;
  test(`${configuration.description} - month`, () => expect(holiday.month).toStrictEqual(expected));
})

describe.each([
  ['invalid-which-empty'],
  ['invalid-which-missing'],
  ['invalid-which-value'],
  ['invalid-month-empty'],
  ['invalid-month-missing'],
  ['invalid-month-value'],
  ['invalid-weekday-empty'],
  ['invalid-weekday-missing'],
  ['invalid-weekday-value']
])('invalid configurations', (fileName: string) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${configuration.description} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const validation = configuration.validate();
  test(`${configuration.description} - validation length`, () => expect(validation.length).toBe(1));
})
