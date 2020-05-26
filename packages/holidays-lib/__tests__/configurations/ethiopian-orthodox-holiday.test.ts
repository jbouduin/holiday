import * as path from 'path';

import { ConfigurationFactory } from '../../src/configuration';
import { ErrorKeys } from '../../src/configuration';
import { IEthiopianOrthodoxHoliday, EthiopianOrthodoxHolidayType } from '../../src/configuration';

const dataRoot = './data/ethiopian-orthodox-holiday';

describe.each([
  ['type.enkutatash', EthiopianOrthodoxHolidayType.ENKUTATASH],
  ['type.meskel', EthiopianOrthodoxHolidayType.MESKEL],
  ['type.timkat', EthiopianOrthodoxHolidayType.TIMKAT]
])('Ethiopian Orthodox > type', (fileName: string, expected: EthiopianOrthodoxHolidayType) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`${fileName} > number of errors`, () => expect(configuration.errors.length).toBe(0));
  test(`${fileName} > number of holidays`, () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday: IEthiopianOrthodoxHoliday = configuration.holidayCollection[0] as IEthiopianOrthodoxHoliday;
  test(`${fileName} > EthiopianOrthodoxHolidayType`,
     () => expect(EthiopianOrthodoxHolidayType[holiday.key]).toBe(EthiopianOrthodoxHolidayType[expected]));
});

describe.each([
  ['invalid.type.empty', ErrorKeys.ETHIOPIAN_ORTHODOX_TYPE_MISSING],
  ['invalid.type.value', ErrorKeys.ETHIOPIAN_ORTHODOX_TYPE_INVALID],
  ['invalid.type.missing', ErrorKeys.ETHIOPIAN_ORTHODOX_TYPE_MISSING]
])('Ethiopian Orthodox > invalid configurations', (fileName: string, key: ErrorKeys) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`${fileName} > number of holidays`, () => expect(configuration.holidayCollection.length).toBe(0));
  test(`${fileName} > number of errors`, () => expect(configuration.errors.length).toBe(2));
  const noValidHolidaysError = configuration.errors.filter(error => error.key === ErrorKeys.NO_VALID_HOLIDAYS_IN_COLLECTION);
  test(`${fileName} >  NO_VALID_HOLIDAYS_IN_COLLECTION error exists`, () => expect(noValidHolidaysError.length).toBe(1));
  const expectedError = configuration.errors.filter(error => error.key === key);
  test(`${fileName} > expected error exists`, () => expect(expectedError.length).toBe(1));
});

describe('Ethiopian Orthodox >  key', () => {
  const file = path.join(__dirname, `${dataRoot}/translation-key.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`number of errors`, () => expect(configuration.errors.length).toBe(0));
  test(`number of holidays`, () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday = configuration.holidayCollection[0];
  test(`translation-key`, () => expect(holiday.translationKey).toBeDefined());
});
