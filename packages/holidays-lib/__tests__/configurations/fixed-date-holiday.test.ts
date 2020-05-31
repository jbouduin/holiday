import { ErrorKey } from '../../src/configuration';
import { IFixedDateHoliday } from '../../src/configuration';
import { HolidayType } from '../../src/configuration';
import { Month } from '../../src/configuration';
import { Loader } from '../loader';

const dataRoot = './configurations/data/fixed-date-holiday';

describe.each([
  ['day.numeric-value'],
  ['day.string-value']
])('fixed date > day > %s', (fileName: string) => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/${fileName}.json`);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday: IFixedDateHoliday = configuration.holidays[0] as IFixedDateHoliday;
  test(`day value`, () => expect(holiday.day).toBe(1));
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
])('fixed date > month > %s', (fileName: string, expected: Month) => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/${fileName}.json`);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday: IFixedDateHoliday = configuration.holidays[0] as IFixedDateHoliday;
  test(`value`, () => expect(Month[holiday.month]).toBe(Month[expected]));
});

describe.each([
  ['invalid.day.alphanumeric', 2, ErrorKey.FIXED_DATE_DAY_INVALID],
  ['invalid.day.empty', 2, ErrorKey.FIXED_DATE_DAY_OUT_OF_RANGE],
  ['invalid.day.missing', 2, ErrorKey.FIXED_DATE_DAY_MISSING],
  ['invalid.day.out-of-range', 15, ErrorKey.FIXED_DATE_DAY_OUT_OF_RANGE],
  ['invalid.key.empty', 2, ErrorKey.KEY_MISSING],
  ['invalid.key.missing', 2, ErrorKey.KEY_MISSING],
  ['invalid.month.empty', 2, ErrorKey.FIXED_DATE_MONTH_MISSING],
  ['invalid.month.missing', 2, ErrorKey.FIXED_DATE_MONTH_MISSING],
  ['invalid.month.value', 2, ErrorKey.FIXED_DATE_MONTH_INVALID]
])('fixed date > invalid configurations > %s', (fileName: string, expectedNumber: number, key: ErrorKey) => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/${fileName}.json`);
  test('number of holidays', () => expect(configuration.holidays.length).toBe(0));
  test('number of errors', () => expect(configuration.errors.length).toBe(expectedNumber));
  const noValidHolidaysError = configuration.errors.filter(error => error.key === ErrorKey.NO_VALID_HOLIDAYS_IN_COLLECTION);
  test('NO_VALID_HOLIDAYS_IN_COLLECTION error exists', () => expect(noValidHolidaysError.length).toBe(1));
  const expectedError = configuration.errors.filter(error => error.key === key);
  test('expected error exists', () => expect(expectedError.length).toBe(expectedNumber - 1));
})

describe('Fixed date > holiday translation key', () => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/translation-key.json`);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday = configuration.holidays[0];
  test(`translation-key`, () => expect(holiday.translationKey).toBeDefined());
});

describe('Islamic holiday', () => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/holiday-type.json`);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday = configuration.holidays[0];
  test(
    `holidayType value`,
    () => expect(HolidayType[holiday.holidayType]).toBe(HolidayType[HolidayType.FIXED_DATE]));
});
