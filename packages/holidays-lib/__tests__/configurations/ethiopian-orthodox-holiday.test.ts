import { ErrorKey } from '../../src/configuration';
import { IEthiopianOrthodoxHoliday, EthiopianOrthodoxHolidayType } from '../../src/configuration';
import { HolidayType } from '../../src/configuration';
import { Loader } from '../loader';

const dataRoot = './configurations/data/ethiopian-orthodox-holiday';

describe.each([
  ['type.enkutatash', EthiopianOrthodoxHolidayType.ENKUTATASH],
  ['type.meskel', EthiopianOrthodoxHolidayType.MESKEL],
  ['type.timkat', EthiopianOrthodoxHolidayType.TIMKAT]
])('Ethiopian Orthodox > type > %s', (fileName: string, expected: EthiopianOrthodoxHolidayType) => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/${fileName}.json`);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday: IEthiopianOrthodoxHoliday = configuration.holidays[0] as IEthiopianOrthodoxHoliday;
  test(`EthiopianOrthodoxHolidayType`,
     () => expect(EthiopianOrthodoxHolidayType[holiday.key]).toBe(EthiopianOrthodoxHolidayType[expected]));
  test(`string key`, () => expect(holiday.stringKey).toBe(EthiopianOrthodoxHolidayType[expected]));
});

describe.each([
  ['invalid.type.empty', ErrorKey.ETHIOPIAN_ORTHODOX_TYPE_MISSING],
  ['invalid.type.value', ErrorKey.ETHIOPIAN_ORTHODOX_TYPE_INVALID],
  ['invalid.type.missing', ErrorKey.ETHIOPIAN_ORTHODOX_TYPE_MISSING]
])('Ethiopian Orthodox > invalid configurations > %s', (fileName: string, key: ErrorKey) => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/${fileName}.json`);
  test('number of holidays', () => expect(configuration.holidays.length).toBe(0));
  test('number of errors', () => expect(configuration.errors.length).toBe(2));
  const noValidHolidaysError = configuration.errors.filter(error => error.key === ErrorKey.NO_VALID_HOLIDAYS_IN_COLLECTION);
  test('NO_VALID_HOLIDAYS_IN_COLLECTION error exists', () => expect(noValidHolidaysError.length).toBe(1));
  const expectedError = configuration.errors.filter(error => error.key === key);
  test('expected error exists', () => expect(expectedError.length).toBe(1));
});

describe('Ethiopian Orthodox > translation-key', () => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/translation-key.json`);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday = configuration.holidays[0];
  test(`translation-key`, () => expect(holiday.translationKey).toBeDefined());
});

describe('Ethiopian Orthodox > holidayType', () => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/holiday-type.json`);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday = configuration.holidays[0];
  test(
    `holidayType value`,
    () => expect(HolidayType[holiday.holidayType]).toBe(HolidayType[HolidayType.ETHIOPIAN_ORTHODOX]));
});
