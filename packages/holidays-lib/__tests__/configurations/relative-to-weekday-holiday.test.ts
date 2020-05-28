import * as path from 'path';

import { ConfigurationFactory } from '../../src/configuration';
import { ErrorKey } from '../../src/configuration';
import { IFixedWeekday, IRelationWhichWeekdayWhen, IRelativeHoliday } from '../../src/configuration';
import { Month, Weekday, When, Which } from '../../src/configuration';

const dataRoot = './data/relative-to-weekday-holiday';

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
])('relative to weekday > fix month > %s', (fileName: string, expected: Month) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`number of errors`, () => expect(configuration.errors.length).toBe(0));
  test(`number of holidays`, () => expect(configuration.holidays.length).toBe(1));
  const holiday: IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday> =
    configuration.holidays[0] as IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday>;
  test(`month`, () => expect(Month[holiday.fix.month]).toBe(Month[expected]));
});

describe.each([
  ['fix.weekday.00.sunday', Weekday.SUNDAY ],
  ['fix.weekday.01.monday', Weekday.MONDAY ],
  ['fix.weekday.02.tuesday', Weekday.TUESDAY ],
  ['fix.weekday.03.wednesday', Weekday.WEDNESDAY ],
  ['fix.weekday.04.thursday', Weekday.THURSDAY ],
  ['fix.weekday.05.friday', Weekday.FRIDAY ],
  ['fix.weekday.06.saturday', Weekday.SATURDAY ]
])('relative to weekday > fix weekday > %s', (fileName: string, expected: Weekday) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`number of errors`, () => expect(configuration.errors.length).toBe(0));
  test(`number of holidays`, () => expect(configuration.holidays.length).toBe(1));
  const holiday: IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday> =
    configuration.holidays[0] as IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday>;
  test(`weekday`, () => expect(Weekday[holiday.fix.weekday]).toBe(Weekday[expected]));
});

describe.each([
  ['fix.which.01.first', Which.FIRST ],
  ['fix.which.02.second', Which.SECOND ],
  ['fix.which.03.third', Which.THIRD ],
  ['fix.which.04.fourth', Which.FOURTH ],
  ['fix.which.05.last', Which.LAST ]
])('relative to weekday > fix which > %s', (fileName: string, expected: Which) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`number of errors`, () => expect(configuration.errors.length).toBe(0));
  test(`number of holidays`, () => expect(configuration.holidays.length).toBe(1));
  const holiday: IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday> =
    configuration.holidays[0] as IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday>;
  test(`which`, () => expect(Which[holiday.fix.which]).toBe(Which[expected]));
});

describe.each([
  ['relation.weekday.00.sunday', Weekday.SUNDAY],
  ['relation.weekday.01.monday', Weekday.MONDAY],
  ['relation.weekday.02.tuesday', Weekday.TUESDAY],
  ['relation.weekday.03.wednesday', Weekday.WEDNESDAY],
  ['relation.weekday.04.thursday', Weekday.THURSDAY],
  ['relation.weekday.05.friday', Weekday.FRIDAY],
  ['relation.weekday.06.saturday', Weekday.SATURDAY]
])('relative to weekday > weekday > %s', (fileName: string, expected: Weekday) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`number of errors`, () => expect(configuration.errors.length).toBe(0));
  test(`number of holidays`, () => expect(configuration.holidays.length).toBe(1));
  const holiday: IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday> =
    configuration.holidays[0] as IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday>;
  test(`weekday`, () => expect(Weekday[holiday.relation.weekday]).toBe(Weekday[expected]));
});

describe.each([
  ['relation.when.before', When.BEFORE ],
  ['relation.when.after', When.AFTER ]
])('relative to weekday > relation when > %s', (fileName: string, expected: When) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`number of errors`, () => expect(configuration.errors.length).toBe(0));
  test(`number of holidays`, () => expect(configuration.holidays.length).toBe(1));
  const holiday: IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday> =
    configuration.holidays[0] as IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday>;
  test(`which`, () => expect(When[holiday.relation.when]).toBe(When[expected]));
});

describe.each([
  ['relation.which.01.first', Which.FIRST ],
  ['relation.which.02.second', Which.SECOND ],
  ['relation.which.03.third', Which.THIRD ],
  ['relation.which.04.fourth', Which.FOURTH ],
  ['relation.which.missing', Which.FIRST]
])('relative to weekday > relation which > %s', (fileName: string, expected: Which) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`number of errors`, () => expect(configuration.errors.length).toBe(0));
  test(`number of holidays`, () => expect(configuration.holidays.length).toBe(1));
  const holiday: IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday> =
    configuration.holidays[0] as IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday>;
  test(`which`, () => expect(Which[holiday.relation.which]).toBe(Which[expected]));
});

describe.each([
  ['invalid.fix.empty', ErrorKey.RELATIVE_FIX_EMPTY],
  ['invalid.fix.missing', ErrorKey.RELATIVE_FIX_MISSING],
  ['invalid.fix.month.missing', ErrorKey.FIXED_WEEKDAY_MONTH_MISSING],
  ['invalid.fix.month.empty', ErrorKey.FIXED_WEEKDAY_MONTH_MISSING],
  ['invalid.fix.month.value', ErrorKey.FIXED_WEEKDAY_MONTH_INVALID],
  ['invalid.fix.weekday.missing', ErrorKey.FIXED_WEEKDAY_WEEKDAY_MISSING],
  ['invalid.fix.weekday.empty', ErrorKey.FIXED_WEEKDAY_WEEKDAY_MISSING],
  ['invalid.fix.weekday.value', ErrorKey.FIXED_WEEKDAY_WEEKDAY_INVALID],
  ['invalid.fix.which.missing', ErrorKey.FIXED_WEEKDAY_WHICH_MISSING],
  ['invalid.fix.which.empty', ErrorKey.FIXED_WEEKDAY_WHICH_MISSING],
  ['invalid.fix.which.value', ErrorKey.FIXED_WEEKDAY_WHICH_INVALID],
  ['invalid.relation.empty', ErrorKey.RELATIVE_RELATION_EMPTY],
  ['invalid.relation.missing', ErrorKey.RELATIVE_RELATION_MISSING],
  ['invalid.relation.weekday.empty', ErrorKey.RELATION_WEEKDAY_MISSING],
  ['invalid.relation.weekday.missing', ErrorKey.RELATION_WEEKDAY_MISSING],
  ['invalid.relation.weekday.value', ErrorKey.RELATION_WEEKDAY_INVALID],
  ['invalid.relation.when.empty', ErrorKey.RELATION_WHEN_MISSING],
  ['invalid.relation.when.missing', ErrorKey.RELATION_WHEN_MISSING],
  ['invalid.relation.when.value', ErrorKey.RELATION_WHEN_INVALID],
  ['invalid.relation.which.empty', ErrorKey.RELATION_WHICH_MISSING],
  ['invalid.relation.which.last', ErrorKey.RELATION_WHICH_INVALID],
  ['invalid.relation.which.value', ErrorKey.RELATION_WHICH_INVALID]
])('relative to weekday > invalid configurations > %s', (fileName: string, key: ErrorKey) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`number of holidays`, () => expect(configuration.holidays.length).toBe(0));
  test(`number of errors`, () => expect(configuration.errors.length).toBe(2));
  const noValidHolidaysError = configuration.errors.filter(error => error.key === ErrorKey.NO_VALID_HOLIDAYS_IN_COLLECTION);
  test(`NO_VALID_HOLIDAYS_IN_COLLECTION error exists`, () => expect(noValidHolidaysError.length).toBe(1));
  const expectedError = configuration.errors.filter(error => error.key === key);
  test(`expected error exists`, () => expect(expectedError.length).toBe(1));
});

describe('relative to weekday > translationkey', () => {
  const file = path.join(__dirname, `${dataRoot}/translation-key.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`number of errors`, () => expect(configuration.errors.length).toBe(0));
  test(`number of holidays`, () => expect(configuration.holidays.length).toBe(1));
  const holiday = configuration.holidays[0];
  test(`translation-key`, () => expect(holiday.translationKey).toBeDefined());
});
