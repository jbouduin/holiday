import * as path from 'path';

import { Holidays } from '../../src/api';
import { ErrorKey } from '../../src/configuration';
import { IChristianHoliday, ChristianHolidayType } from '../../src/configuration';
import { HolidayType , ChronologyType } from '../../src/configuration';

const dataRoot = './data/christian-holiday';

describe.each([
  ['type.ascension_day', ChristianHolidayType.ASCENSION_DAY],
  ['type.ash_wednesday', ChristianHolidayType.ASH_WEDNESDAY],
  ['type.carnival', ChristianHolidayType.CARNIVAL],
  ['type.clean_monday', ChristianHolidayType.CLEAN_MONDAY],
  ['type.corpus_christi', ChristianHolidayType.CORPUS_CHRISTI],
  ['type.easter_monday', ChristianHolidayType.EASTER_MONDAY],
  ['type.easter_saturday', ChristianHolidayType.EASTER_SATURDAY],
  ['type.easter_tuesday', ChristianHolidayType.EASTER_TUESDAY],
  ['type.easter', ChristianHolidayType.EASTER],
  ['type.general_prayer_day', ChristianHolidayType.GENERAL_PRAYER_DAY],
  ['type.good_friday', ChristianHolidayType.GOOD_FRIDAY],
  ['type.mardi_gras', ChristianHolidayType.MARDI_GRAS],
  ['type.maundy_thursday', ChristianHolidayType.MAUNDY_THURSDAY],
  ['type.pentecost_monday', ChristianHolidayType.PENTECOST_MONDAY],
  ['type.pentecost', ChristianHolidayType.PENTECOST],
  ['type.sacred_heart', ChristianHolidayType.SACRED_HEART],
  ['type.shrove_monday', ChristianHolidayType.SHROVE_MONDAY],
  ['type.whit_sunday', ChristianHolidayType.WHIT_SUNDAY],
  ['type.whit_monday', ChristianHolidayType.WHIT_MONDAY]
])('Christian holiday > key > %s ', (fileName: string, expected: ChristianHolidayType) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new Holidays().loadByFileName(file);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday: IChristianHoliday = configuration.holidays[0] as IChristianHoliday;
  test(`ChristianHolidayType value`,
     () => expect(ChristianHolidayType[holiday.key]).toBe(ChristianHolidayType[expected]));
})

describe.each([
  ['chronology.empty', ChronologyType.GREGORIAN],
  ['chronology.gregorian', ChronologyType.GREGORIAN],
  ['chronology.julian', ChronologyType.JULIAN],
  ['chronology.not-specified', ChronologyType.GREGORIAN]
])('Christian holiday > chronology > %s', (fileName: string, expected: ChronologyType) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new Holidays().loadByFileName(file);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday: IChristianHoliday = configuration.holidays[0] as IChristianHoliday;
  test(`ChronologyType value`,
    () => expect(ChronologyType[holiday.chronology]).toBe(ChronologyType[expected]));
})

describe.each([
  ['invalid.chronology.value', ErrorKey.CHRISTIAN_CHRONOLOGY_INVALID],
  ['invalid.type.empty', ErrorKey.CHRISTIAN_TYPE_MISSING],
  ['invalid.type.value', ErrorKey.CHRISTIAN_TYPE_INVALID],
  ['invalid.type.missing', ErrorKey.CHRISTIAN_TYPE_MISSING]
])('Christian Holiday > invalid configurations > %s', (fileName: string, key: ErrorKey) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new Holidays().loadByFileName(file);
  test('number of holidays', () => expect(configuration.holidays.length).toBe(0));
  test('number of errors', () => expect(configuration.errors.length).toBe(2));
  const noValidHolidaysError = configuration.errors.filter(error => error.key === ErrorKey.NO_VALID_HOLIDAYS_IN_COLLECTION);
  test('NO_VALID_HOLIDAYS_IN_COLLECTION error exists', () => expect(noValidHolidaysError.length).toBe(1));
  const expectedError = configuration.errors.filter(error => error.key === key);
  test('expected error exists', () => expect(expectedError.length).toBe(1));
})

describe('Christian holiday > translation key', () => {
  const file = path.join(__dirname, `${dataRoot}/translation-key.json`);
  const configuration = new Holidays().loadByFileName(file);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday = configuration.holidays[0];
  test(`translation-key`, () => expect(holiday.translationKey).toBeDefined());
});

describe('Christian holiday > holidayType', () => {
  const file = path.join(__dirname, `${dataRoot}/holiday-type.json`);
  const configuration = new Holidays().loadByFileName(file);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday = configuration.holidays[0];
  test(
    `holidayType value`,
    () => expect(HolidayType[holiday.holidayType]).toBe(HolidayType[HolidayType.CHRISTIAN]));
});
