import * as path from 'path';

import { ConfigurationFactory } from '../../src/configuration';
import { ErrorKey } from '../../src/configuration';
import { IFixedDate, IRelationWhichWeekdayWhen, IRelativeHoliday } from '../../src/configuration';
import { Month, Weekday, When, Which } from '../../src/configuration';

const dataRoot = './data/relative-to-date-holiday';

describe.each([
  ['relation.which.01.first', Which.FIRST ],
  ['relation.which.02.second', Which.SECOND ],
  ['relation.which.03.third', Which.THIRD ],
  ['relation.which.04.fourth', Which.FOURTH ],
  ['relation.which.missing', Which.FIRST]
])('relative to date > relation which > %s', (fileName: string, expected: Which) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`number of errors`, () => expect(configuration.errors.length).toBe(0));
  test(`number of holidays`, () => expect(configuration.holidays.length).toBe(1));
  const holiday: IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedDate> =
    configuration.holidays[0] as IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedDate>;
  test(`which`, () => expect(Which[holiday.relation.which]).toBe(Which[expected]));
});

describe.each([
  ['relation.weekday.00.sunday', Weekday.SUNDAY],
  ['relation.weekday.01.monday', Weekday.MONDAY],
  ['relation.weekday.02.tuesday', Weekday.TUESDAY],
  ['relation.weekday.03.wednesday', Weekday.WEDNESDAY],
  ['relation.weekday.04.thursday', Weekday.THURSDAY],
  ['relation.weekday.05.friday', Weekday.FRIDAY],
  ['relation.weekday.06.saturday', Weekday.SATURDAY]
])('relative to date > weekday > %s', (fileName: string, expected: Weekday) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`number of errors`, () => expect(configuration.errors.length).toBe(0));
  test(`number of holidays`, () => expect(configuration.holidays.length).toBe(1));
  const holiday: IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedDate> =
    configuration.holidays[0] as IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedDate>;
  test(`weekday`, () => expect(Weekday[holiday.relation.weekday]).toBe(Weekday[expected]));
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
])('relative to date > fix month/day > %s', (fileName: string, expected: Month) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`number of errors`, () => expect(configuration.errors.length).toBe(0));
  test(`number of holidays`, () => expect(configuration.holidays.length).toBe(1));
  const holiday: IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedDate> =
    configuration.holidays[0] as IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedDate>;
  test(`month`, () => expect(Month[holiday.fix.month]).toBe(Month[expected]));
  test(`day`, () => expect(holiday.fix.day).toBe(19));
});

describe.each([
  ['relation.when.before', When.BEFORE ],
  ['relation.when.after', When.AFTER ]
])('relative to date > relation when > %s', (fileName: string, expected: When) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`number of errors`, () => expect(configuration.errors.length).toBe(0));
  test(`number of holidays`, () => expect(configuration.holidays.length).toBe(1));
  const holiday: IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedDate> =
    configuration.holidays[0] as IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedDate>;
  test(`which`, () => expect(When[holiday.relation.when]).toBe(When[expected]));
});

describe.each([
  ['invalid.fix.empty', 2, ErrorKey.RELATIVE_FIX_EMPTY],
  ['invalid.fix.missing', 2, ErrorKey.RELATIVE_FIX_MISSING],
  ['invalid.fix.month.missing', 2, ErrorKey.FIXED_DATE_MONTH_MISSING],
  ['invalid.fix.month.empty', 2, ErrorKey.FIXED_DATE_MONTH_MISSING],
  ['invalid.fix.month.value', 2, ErrorKey.FIXED_DATE_MONTH_INVALID],
  ['invalid.fix.day.alphanumeric', 2, ErrorKey.FIXED_DATE_DAY_INVALID],
  ['invalid.fix.day.missing', 2, ErrorKey.FIXED_DATE_DAY_MISSING],
  ['invalid.fix.day.empty', 2, ErrorKey.FIXED_DATE_DAY_OUT_OF_RANGE],
  ['invalid.fix.day.out-of-range', 15, ErrorKey.FIXED_DATE_DAY_OUT_OF_RANGE],
  ['invalid.relation.empty', 2, ErrorKey.RELATIVE_RELATION_EMPTY],
  ['invalid.relation.missing', 2, ErrorKey.RELATIVE_RELATION_MISSING],
  ['invalid.relation.which.empty', 2, ErrorKey.RELATION_WHICH_MISSING],
  ['invalid.relation.which.last', 2, ErrorKey.RELATION_WHICH_INVALID],
  ['invalid.relation.which.value', 2, ErrorKey.RELATION_WHICH_INVALID],
  ['invalid.relation.weekday.missing', 2, ErrorKey.RELATION_WEEKDAY_MISSING],
  ['invalid.relation.weekday.empty', 2, ErrorKey.RELATION_WEEKDAY_MISSING],
  ['invalid.relation.weekday.value', 2, ErrorKey.RELATION_WEEKDAY_INVALID],
  ['invalid.relation.when.empty', 2, ErrorKey.RELATION_WHEN_MISSING],
  ['invalid.relation.when.missing', 2, ErrorKey.RELATION_WHEN_MISSING],
  ['invalid.relation.when.value', 2, ErrorKey.RELATION_WHEN_INVALID]
])('relative to date > invalid configurations > %s', (fileName: string, expectedNumber: number, key: ErrorKey) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`number of holidays`, () => expect(configuration.holidays.length).toBe(0));
  test(`number of errors`, () => expect(configuration.errors.length).toBe(expectedNumber));
  const noValidHolidaysError = configuration.errors.filter(error => error.key === ErrorKey.NO_VALID_HOLIDAYS_IN_COLLECTION);
  test(`NO_VALID_HOLIDAYS_IN_COLLECTION error exists`, () => expect(noValidHolidaysError.length).toBe(1));
  const expectedError = configuration.errors.filter(error => error.key === key);
  test(`expected error exists`, () => expect(expectedError.length).toBe(expectedNumber - 1));
});

describe('relative to date > translationkey', () => {
  const file = path.join(__dirname, `${dataRoot}/translation-key.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`number of errors`, () => expect(configuration.errors.length).toBe(0));
  test(`number of holidays`, () => expect(configuration.holidays.length).toBe(1));
  const holiday = configuration.holidays[0];
  test(`translation-key`, () => expect(holiday.translationKey).toBeDefined());
});
