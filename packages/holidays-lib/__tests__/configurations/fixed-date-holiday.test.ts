import * as path from 'path';

import { IConfiguration } from '../../src/configuration';
import { ConfigurationFactory } from '../../src/configuration';
import { ErrorKeys } from '../../src/configuration';
import { IFixedDateHoliday } from '../../src/configuration';
import { Month } from '../../src/configuration';

const dataRoot = './data/fixed-date-holiday';

describe.each([
  ['day.numeric-value'],
  ['day.string-value']
])('fixed date > day', (fileName: string) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`${fileName} > number of errors`, () => expect(configuration.errors.length).toBe(0));
  test(`${fileName} > number of holidays`, () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday: IFixedDateHoliday = configuration.holidayCollection[0] as IFixedDateHoliday;
  test(`${fileName} > value`, () => expect(holiday.day).toBe(1));
});

describe.each([
  ['01.month.january', Month.JANUARY],
  ['02.month.february', Month.FEBRUARY],
  ['03.month.march', Month.MARCH],
  ['04.month.april', Month.APRIL],
  ['05.month.may', Month.MAY],
  ['06.month.june', Month.JUNE],
  ['07.month.july', Month.JULY],
  ['08.month.august', Month.AUGUST],
  ['09.month.september', Month.SEPTEMBER],
  ['10.month.october', Month.OCTOBER],
  ['11.month.november', Month.NOVEMBER],
  ['12.month.december', Month.DECEMBER],
])('fixed date > month', (fileName: string, expected: Month) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`${fileName} > number of errors`, () => expect(configuration.errors.length).toBe(0));
  test(`${fileName} > number of holidays`, () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday: IFixedDateHoliday = configuration.holidayCollection[0] as IFixedDateHoliday;
  test(`${fileName} > value`, () => expect(Month[holiday.month]).toBe(Month[expected]));
});

describe.each([
  ['invalid.day.alphanumeric', 2, ErrorKeys.FIXED_DATE_DAY_INVALID],
  ['invalid.day.empty', 2, ErrorKeys.FIXED_DATE_SAY_OUT_OF_RANGE],
  ['invalid.day.missing', 2, ErrorKeys.FIXED_DATE_DAY_MISSING],
  ['invalid.day.out-of-range', 15, ErrorKeys.FIXED_DATE_SAY_OUT_OF_RANGE],
  ['invalid.key.empty', 2, ErrorKeys.KEY_MISSING],
  ['invalid.key.missing', 2, ErrorKeys.KEY_MISSING],
  ['invalid.month.empty', 2, ErrorKeys.FIXED_DATE_MONTH_MISSING],
  ['invalid.month.missing', 2, ErrorKeys.FIXED_DATE_MONTH_MISSING],
  ['invalid.month.value', 2, ErrorKeys.FIXED_DATE_MONTH_INVALID]
])('fixed date > invalid configurations', (fileName: string, expectedNumber: number, key: ErrorKeys) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`${fileName} > number of holidays`, () => expect(configuration.holidayCollection.length).toBe(0));
  test(`${fileName} > number of errors`, () => expect(configuration.errors.length).toBe(expectedNumber));
  const noValidHolidaysError = configuration.errors.filter(error => error.key === ErrorKeys.NO_VALID_HOLIDAYS_IN_COLLECTION);
  test(`${fileName} >  NO_VALID_HOLIDAYS_IN_COLLECTION error exists`, () => expect(noValidHolidaysError.length).toBe(1));
  const expectedError = configuration.errors.filter(error => error.key === key);
  test(`${fileName} > expected error exists`, () => expect(expectedError.length).toBe(expectedNumber - 1));
})

describe('Fixed date > holiday translation key', () => {
  const file = path.join(__dirname, `${dataRoot}/translation-key.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`number of errors`, () => expect(configuration.errors.length).toBe(0));
  test(`number of holidays`, () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday = configuration.holidayCollection[0];
  test(`translation-key`, () => expect(holiday.translationKey).toBeDefined());
});
