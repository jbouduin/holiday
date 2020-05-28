import * as path from 'path';

import { IConfiguration } from '../../src/configuration';
import { ConfigurationFactory } from '../../src/configuration';
import { ErrorKey } from '../../src/configuration';
import { BaseHoliday } from '../../src/configuration';
import { CycleType } from '../../src/configuration';
import { HolidayStatus } from '../../src/configuration';
import { HolidayType } from '../../src/configuration';

const dataRoot = './data/base-holiday';

describe.each([
  ['cycle-type.empty', CycleType.EVERY_YEAR],
  ['cycle-type.even-years', CycleType.EVEN_YEARS],
  ['cycle-type.every-year', CycleType.EVERY_YEAR],
  ['cycle-type.five-years', CycleType.FIVE_YEARS],
  ['cycle-type.four-years', CycleType.FOUR_YEARS],
  ['cycle-type.not-specified', CycleType.EVERY_YEAR],
  ['cycle-type.odd-years', CycleType.ODD_YEARS],
  ['cycle-type.six-years', CycleType.SIX_YEARS],
  ['cycle-type.two-years', CycleType.TWO_YEARS]
])('base holiday > cycle type', (fileName: string, expected: CycleType) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`${fileName} > number of errors`, () => expect(configuration.errors.length).toBe(0));
  test(`${fileName} > number of holidays`, () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday = configuration.holidayCollection[0];
  test(`${fileName} > value`, () => expect(CycleType[holiday.cycle]).toBe(CycleType[expected]));
});

describe.each([
  ['from.not-specified', BaseHoliday.undefinedValidFrom],
  ['from.1986', 1986]
])('base holiday > valid from', (fileName: string, expected: CycleType) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`${fileName} > number of errors`, () => expect(configuration.errors.length).toBe(0));
  test(`${fileName} > number of holidays`, () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday = configuration.holidayCollection[0];
  test(`${fileName} > value`, () => expect(holiday.validFrom).toBe(expected));
});

describe.each([
  ['to.not-specified', BaseHoliday.undefinedValidTo],
  ['to.1986', 1986]
])('base holiday > valid to', (fileName: string, expected: CycleType) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`${fileName} > number of errors`, () => expect(configuration.errors.length).toBe(0));
  test(`${fileName} > number of holidays`, () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday = configuration.holidayCollection[0];
  test(`${fileName} - value`, () => expect(holiday.validTo).toBe(expected));
});

describe.each([
  ['holiday-status.empty', HolidayStatus.OFFICIAL_HOLIDAY],
  ['holiday-status.not-specified', HolidayStatus.OFFICIAL_HOLIDAY],
  ['holiday-status.official', HolidayStatus.OFFICIAL_HOLIDAY],
  ['holiday-status.unofficial', HolidayStatus.UNOFFICIAL_HOLIDAY]
])('base holiday > holiday status', (fileName: string, expected: HolidayStatus) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`${fileName} > number of errors`, () => expect(configuration.errors.length).toBe(0));
  test(`${fileName} > number of holidays`, () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday = configuration.holidayCollection[0];
  test(`${fileName} - value`, () => expect(HolidayStatus[holiday.holidayStatus]).toBe(HolidayStatus[expected]));
});

describe.each([
  ['invalid.cycle-type.six-years.missing-from', ErrorKey.CYCLE_TYPE_REQUIRES_VALID_FROM],
  ['invalid.cycle-type.two-years.missing-from', ErrorKey.CYCLE_TYPE_REQUIRES_VALID_FROM],
  ['invalid.from-alphanumeric', ErrorKey.VALID_FROM_INVALID],
  ['invalid.holiday-status-value', ErrorKey.HOLIDAY_STATUS_INVALID],
  ['invalid.key-empty', ErrorKey.KEY_MISSING],
  ['invalid.to-alphanumeric', ErrorKey.VALID_TO_INVALID],
  ['invalid.to-lt-from', ErrorKey.VALID_TO_BEFORE_VALID_FROM],
  ['invalid.cycle-type.five-years.missing-from', ErrorKey.CYCLE_TYPE_REQUIRES_VALID_FROM],
  ['invalid.cycle-type.four-years.missing-from', ErrorKey.CYCLE_TYPE_REQUIRES_VALID_FROM],
  ['invalid.cycle-type.value', ErrorKey.CYCLE_TYPE_INVALID]
])('invalid base holiday configurations', (fileName: string, expected: ErrorKey) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`${fileName} > number of holidays`, () => expect(configuration.holidayCollection.length).toBe(0));
  test(`${fileName} > number of errors`, () => expect(configuration.errors.length).toBe(2));
  const noValidHolidaysError = configuration.errors.filter(error => error.key === ErrorKey.NO_VALID_HOLIDAYS_IN_COLLECTION);
  test(`${fileName} >  NO_VALID_HOLIDAYS_IN_COLLECTION error exists`, () => expect(noValidHolidaysError.length).toBe(1));
  const expectedError = configuration.errors.filter(error => error.key === expected);
  test(`${fileName} > expected error exists`, () => expect(expectedError.length).toBe(1));
});
