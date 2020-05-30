import * as path from 'path';

import { Holidays } from '../../src/api';
import { ErrorKey } from '../../src/configuration';
import { HolidayType } from '../../src/configuration';
import { IBetweenFixedDates }  from '../../src/configuration';
import { IRelationWeekday, IRelativeHoliday }  from '../../src/configuration';
import { Month, Weekday } from '../../src/configuration';

const dataRoot = './data/relative-between-fixed-holiday';

describe.each([
  ['weekday.00.sunday', Weekday.SUNDAY],
  ['weekday.01.monday', Weekday.MONDAY],
  ['weekday.02.tuesday', Weekday.TUESDAY],
  ['weekday.03.wednesday', Weekday.WEDNESDAY],
  ['weekday.04.thursday', Weekday.THURSDAY],
  ['weekday.05.friday', Weekday.FRIDAY],
  ['weekday.06.saturday', Weekday.SATURDAY]
])('relative between fixed > weekday > %s', (fileName: string, expected: Weekday) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new Holidays().loadByFileName(file);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday: IRelativeHoliday<IRelationWeekday, IBetweenFixedDates> =
    configuration.holidays[0] as IRelativeHoliday<IRelationWeekday, IBetweenFixedDates>;
  test(`weekday`, () => expect(Weekday[holiday.relation.weekday]).toBe(Weekday[expected]));
});

describe('relative between fixed across months', () => {
  const file = path.join(__dirname, `${dataRoot}/fix.across-months.json`);
  const configuration = new Holidays().loadByFileName(file);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday: IRelativeHoliday<IRelationWeekday, IBetweenFixedDates> =
    configuration.holidays[0] as IRelativeHoliday<IRelationWeekday, IBetweenFixedDates>;
  test(`fix from > month`, () => expect(Month[holiday.fix.from.month]).toBe(Month[Month.MAY]));
  test(`fix from > day`, () => expect(holiday.fix.from.day).toBe(30));
  test(`fix to > month`, () => expect(Month[holiday.fix.to.month]).toBe(Month[Month.JUNE]));
  test(`fix to > day`, () => expect(holiday.fix.to.day).toBe(5));
});

describe.each([
  ['fix.in.01.january', Month.JANUARY ],
  ['fix.in.02.februari', Month.FEBRUARY ],
  ['fix.in.03.march', Month.MARCH ],
  ['fix.in.04.april', Month.APRIL ],
  ['fix.in.05.may', Month.MAY ],
  ['fix.in.06.june', Month.JUNE ],
  ['fix.in.07.july', Month.JULY ],
  ['fix.in.08.august', Month.AUGUST ],
  ['fix.in.09.september', Month.SEPTEMBER ],
  ['fix.in.10.october', Month.OCTOBER ],
  ['fix.in.11.november', Month.NOVEMBER ],
  ['fix.in.12.december', Month.DECEMBER ]
])('relative between fixed > fix > %s', (fileName: string, expected: Month) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new Holidays().loadByFileName(file);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday: IRelativeHoliday<IRelationWeekday, IBetweenFixedDates> =
    configuration.holidays[0] as IRelativeHoliday<IRelationWeekday, IBetweenFixedDates>;
  test(`fix from > month`, () => expect(Month[holiday.fix.from.month]).toBe(Month[expected]));
  test(`fix from > day`, () => expect(holiday.fix.from.day).toBe(19));
  test(`fix to > month`, () => expect(Month[holiday.fix.to.month]).toBe(Month[expected]));
  test(`fix to > day`, () => expect(holiday.fix.to.day).toBe(25));
});

describe.each([
  ['invalid.fix.empty', ErrorKey.RELATIVE_FIX_EMPTY],
  ['invalid.fix.from.missing', ErrorKey.RELATIVE_BETWEEN_FIXED_FROM_MISSING],
  ['invalid.fix.missing', ErrorKey.RELATIVE_FIX_MISSING],
  ['invalid.fix.to.missing', ErrorKey.RELATIVE_BETWEEN_FIXED_TO_MISSING],
  ['invalid.key.empty', ErrorKey.KEY_MISSING],
  ['invalid.key.missing', ErrorKey.KEY_MISSING],
  ['invalid.relation.missing', ErrorKey.RELATIVE_RELATION_MISSING],
  ['invalid.relation.weekday.missing', ErrorKey.RELATIVE_RELATION_EMPTY],
  ['invalid.relation.weekday.empty', ErrorKey.RELATION_WEEKDAY_INVALID],
  ['invalid.relation.weekday.value', ErrorKey.RELATION_WEEKDAY_INVALID],
  ['invalid.fix.timespan.invalid', ErrorKey.RELATIVE_BETWEEN_FIXED_SPAN_INVALID],
  ['invalid.fix.to-before-from', ErrorKey.RELATIVE_BETWEEN_FIXED_FIX_TO_BEFORE_FROM]
])('relative between fixed > invalid configurations > %s', (fileName: string, key: ErrorKey) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new Holidays().loadByFileName(file);
  test('number of holidays', () => expect(configuration.holidays.length).toBe(0));
  test('number of errors', () => expect(configuration.errors.length).toBe(2));
  const noValidHolidaysError = configuration.errors.filter(error => error.key === ErrorKey.NO_VALID_HOLIDAYS_IN_COLLECTION);
  test('NO_VALID_HOLIDAYS_IN_COLLECTION error exists', () => expect(noValidHolidaysError.length).toBe(1));
  const expectedError = configuration.errors.filter(error => error.key === key);
  test('expected error exists', () => expect(expectedError.length).toBe(1));
});

describe.each([
  ['invalid.fix.days.empty', ErrorKey.FIXED_DATE_DAY_OUT_OF_RANGE],
  ['invalid.fix.days.missing', ErrorKey.FIXED_DATE_DAY_MISSING],
  ['invalid.fix.days.invalid', ErrorKey.FIXED_DATE_DAY_INVALID],
  ['invalid.fix.months.empty', ErrorKey.FIXED_DATE_MONTH_MISSING],
  ['invalid.fix.months.missing', ErrorKey.FIXED_DATE_MONTH_MISSING],
  ['invalid.fix.months.invalid', ErrorKey.FIXED_DATE_MONTH_INVALID],
])('relative between fixed > invalid configurations > %s', (fileName: string, key: ErrorKey) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new Holidays().loadByFileName(file);
  test('number of holidays', () => expect(configuration.holidays.length).toBe(0));
  test('number of errors', () => expect(configuration.errors.length).toBe(3));
  const noValidHolidaysError = configuration.errors.filter(error => error.key === ErrorKey.NO_VALID_HOLIDAYS_IN_COLLECTION);
  test('NO_VALID_HOLIDAYS_IN_COLLECTION error exists', () => expect(noValidHolidaysError.length).toBe(1));
  const expectedError = configuration.errors.filter(error => error.key === key);
  test('expected error exists', () => expect(expectedError.length).toBe(2));
});

describe('relative between fixed > translation-key', () => {
  const file = path.join(__dirname, `${dataRoot}/translation-key.json`);
  const configuration = new Holidays().loadByFileName(file);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday = configuration.holidays[0];
  test(`translation-key`, () => expect(holiday.translationKey).toBeDefined());
});

describe('relative between fixed > holidayType', () => {
  const file = path.join(__dirname, `${dataRoot}/holiday-type.json`);
  const configuration = new Holidays().loadByFileName(file);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday = configuration.holidays[0];
  test(
    `holidayType value`,
    () => expect(HolidayType[holiday.holidayType]).toBe(HolidayType[HolidayType.RELATIVE_BETWEEN_FIXED]));
});
