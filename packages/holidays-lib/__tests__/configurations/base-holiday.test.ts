import * as path from 'path';

import { IConfiguration } from '../../src/configuration';
import { Holidays } from '../../src/api';
import { ErrorKey } from '../../src/configuration';
import { BaseHoliday } from '../../src/configuration';
import { Category } from '../../src/configuration';
import { Cycle } from '../../src/configuration';
import { HolidayType } from '../../src/configuration';

const dataRoot = './data/base-holiday';

describe.each([
  ['cycle.empty', Cycle.EVERY_YEAR],
  ['cycle.even-years', Cycle.EVEN_YEARS],
  ['cycle.every-year', Cycle.EVERY_YEAR],
  ['cycle.five-years', Cycle.FIVE_YEARS],
  ['cycle.four-years', Cycle.FOUR_YEARS],
  ['cycle.not-specified', Cycle.EVERY_YEAR],
  ['cycle.odd-years', Cycle.ODD_YEARS],
  ['cycle.six-years', Cycle.SIX_YEARS],
  ['cycle.two-years', Cycle.TWO_YEARS]
])('base holiday > cycle > %s', (fileName: string, expected: Cycle) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new Holidays().loadByFileName(file);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday = configuration.holidays[0];
  test(`value`, () => expect(Cycle[holiday.cycle]).toBe(Cycle[expected]));
});

describe.each([
  ['from.not-specified', BaseHoliday.undefinedValidFrom],
  ['from.1986', 1986]
])('base holiday > valid from > $s', (fileName: string, expected: Cycle) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new Holidays().loadByFileName(file);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday = configuration.holidays[0];
  test(`value`, () => expect(holiday.validFrom).toBe(expected));
});

describe.each([
  ['to.not-specified', BaseHoliday.undefinedValidTo],
  ['to.1986', 1986]
])('base holiday > valid to > %s', (fileName: string, expected: Cycle) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new Holidays().loadByFileName(file);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday = configuration.holidays[0];
  test(`value`, () => expect(holiday.validTo).toBe(expected));
});

describe.each([
  ['category.empty', Category.OFFICIAL_HOLIDAY],
  ['category.not-specified', Category.OFFICIAL_HOLIDAY],
  ['category.official', Category.OFFICIAL_HOLIDAY],
  ['category.unofficial', Category.UNOFFICIAL_HOLIDAY]
])('base holiday > category > %s', (fileName: string, expected: Category) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new Holidays().loadByFileName(file);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday = configuration.holidays[0];
  test(`value`, () => expect(Category[holiday.category]).toBe(Category[expected]));
});

describe.each([
  ['invalid.category.value', ErrorKey.HOLIDAY_CATEGORY_INVALID],
  ['invalid.cycle.five-years.missing-from', ErrorKey.HOLIDAY_CYCLE_REQUIRES_VALID_FROM],
  ['invalid.cycle.four-years.missing-from', ErrorKey.HOLIDAY_CYCLE_REQUIRES_VALID_FROM],
  ['invalid.cycle.six-years.missing-from', ErrorKey.HOLIDAY_CYCLE_REQUIRES_VALID_FROM],
  ['invalid.cycle.two-years.missing-from', ErrorKey.HOLIDAY_CYCLE_REQUIRES_VALID_FROM],
  ['invalid.cycle.value', ErrorKey.HOLIDAY_CYCLE_INVALID],
  ['invalid.from.alphanumeric', ErrorKey.VALID_FROM_INVALID],
  ['invalid.key.empty', ErrorKey.KEY_MISSING],
  ['invalid.to.alphanumeric', ErrorKey.VALID_TO_INVALID],
  ['invalid.to.lt-from', ErrorKey.VALID_TO_BEFORE_VALID_FROM]
])('invalid base holiday configurations > %s', (fileName: string, expected: ErrorKey) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new Holidays().loadByFileName(file);
  test('number of holidays', () => expect(configuration.holidays.length).toBe(0));
  test('number of errors', () => expect(configuration.errors.length).toBe(2));
  const noValidHolidaysError = configuration.errors.filter(error => error.key === ErrorKey.NO_VALID_HOLIDAYS_IN_COLLECTION);
  test('NO_VALID_HOLIDAYS_IN_COLLECTION error exists', () => expect(noValidHolidaysError.length).toBe(1));
  const expectedError = configuration.errors.filter(error => error.key === expected);
  test('expected error exists', () => expect(expectedError.length).toBe(1));
});
