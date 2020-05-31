import { ErrorKey } from '../../src/configuration';
import { IFixedWeekdayHoliday } from '../../src/configuration';
import { HolidayType } from '../../src/configuration';
import { Month } from '../../src/configuration';
import { Weekday } from '../../src/configuration';
import { Which } from '../../src/configuration';
import { Loader } from '../loader';

const dataRoot = './configurations/data/fixed-weekday-holiday';

describe.each([
  ['which.first', Which.FIRST],
  ['which.second', Which.SECOND],
  ['which.third', Which.THIRD],
  ['which.fourth', Which.FOURTH],
  ['which.last', Which.LAST]
])('fixed weekday > which > %s', (fileName: string, expected: Which) => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/${fileName}.json`);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday: IFixedWeekdayHoliday = configuration.holidays[0] as IFixedWeekdayHoliday;
  test(`which value`, () => expect(Which[holiday.which]).toStrictEqual(Which[expected]));
})

describe.each([
  ['weekday.monday', Weekday.MONDAY],
  ['weekday.tuesday', Weekday.TUESDAY],
  ['weekday.wednesday', Weekday.WEDNESDAY],
  ['weekday.thursday', Weekday.THURSDAY],
  ['weekday.friday', Weekday.FRIDAY],
  ['weekday.saturday', Weekday.SATURDAY],
  ['weekday.sunday', Weekday.SUNDAY]
])('fixed weekday > weekday > %s', (fileName: string, expected: Weekday) => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/${fileName}.json`);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday: IFixedWeekdayHoliday = configuration.holidays[0] as IFixedWeekdayHoliday;
  test(`weekday value`, () => expect(Weekday[holiday.weekday]).toBe(Weekday[expected]));
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
])('fixed weekday > month > %s', (fileName: string, expected: Month) => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/${fileName}.json`);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday: IFixedWeekdayHoliday = configuration.holidays[0] as IFixedWeekdayHoliday;
  test(`month value`, () => expect(Month[holiday.month]).toBe(Month[expected]));
})

describe.each([
  ['invalid.key.empty', ErrorKey.KEY_MISSING],
  ['invalid.key.missing', ErrorKey.KEY_MISSING],
  ['invalid.month.empty', ErrorKey.FIXED_WEEKDAY_MONTH_MISSING],
  ['invalid.month.missing', ErrorKey.FIXED_WEEKDAY_MONTH_MISSING],
  ['invalid.month.value', ErrorKey.FIXED_WEEKDAY_MONTH_INVALID],
  ['invalid.weekday.empty', ErrorKey.FIXED_WEEKDAY_WEEKDAY_MISSING],
  ['invalid.weekday.missing', ErrorKey.FIXED_WEEKDAY_WEEKDAY_MISSING],
  ['invalid.weekday.value', ErrorKey.FIXED_WEEKDAY_WEEKDAY_INVALID],
  ['invalid.which.empty', ErrorKey.FIXED_WEEKDAY_WHICH_MISSING],
  ['invalid.which.missing', ErrorKey.FIXED_WEEKDAY_WHICH_MISSING],
  ['invalid.which.value', ErrorKey.FIXED_WEEKDAY_WHICH_INVALID]
])('fixed weekday > invalid configurations > %s', (fileName: string, key: ErrorKey) => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/${fileName}.json`);
  test('number of holidays', () => expect(configuration.holidays.length).toBe(0));
  test('number of errors', () => expect(configuration.errors.length).toBe(2));
  const noValidHolidaysError = configuration.errors.filter(error => error.key === ErrorKey.NO_VALID_HOLIDAYS_IN_COLLECTION);
  test('NO_VALID_HOLIDAYS_IN_COLLECTION error exists', () => expect(noValidHolidaysError.length).toBe(1));
  const expectedError = configuration.errors.filter(error => error.key === key);
  test('expected error exists', () => expect(expectedError.length).toBe(1));
})

describe('Fixed weekday holiday > translation-key', () => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/translation-key.json`);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday = configuration.holidays[0];
  test(`translation-key`, () => expect(holiday.translationKey).toBeDefined());
});

describe('Fixed weekday holiday > holidayType', () => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/holiday-type.json`);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday = configuration.holidays[0];
  test(
    `holidayType value`,
    () => expect(HolidayType[holiday.holidayType]).toBe(HolidayType[HolidayType.FIXED_WEEKDAY]));
});
