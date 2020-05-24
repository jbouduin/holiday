import * as path from 'path';

import { Configuration } from '../../src/configuration/configuration';
import { BaseHoliday } from '../../src/configuration/holidays/base-holiday';
import { CycleType } from '../../src/configuration/holidays/cycle-type';
import { HolidayStatus } from '../../src/configuration/holidays/holiday-status';
import { HolidayType } from '../../src/configuration/holidays/holiday-type';

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
])('base holiday cycle type', (fileName: string, expected: CycleType) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const validation = configuration.validate();
  test(`${fileName} - validation length`, () => expect(validation.length).toBe(0));
  const holiday = configuration.holidayCollection[0];
  test(`${fileName} - cycle type`, () => expect(CycleType[holiday.cycleType]).toBe(CycleType[expected]));
});

describe.each([
  ['from.not-specified', BaseHoliday.undefinedValidFrom],
  ['from.1986', 1986]
])('base holiday valid from', (fileName: string, expected: CycleType) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const validation = configuration.validate();
  test(`${fileName} - validation length`, () => expect(validation.length).toBe(0));
  const holiday = configuration.holidayCollection[0];
  test(`${fileName} - valid-from`, () => expect(holiday.validFrom).toBe(expected));
});

describe.each([
  ['to.not-specified', BaseHoliday.undefinedValidTo],
  ['to.1986', 1986]
])('base holiday valid to', (fileName: string, expected: CycleType) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const validation = configuration.validate();
  test(`${fileName} - validation length`, () => expect(validation.length).toBe(0));
  const holiday = configuration.holidayCollection[0];
  test(`${fileName} - valid-to`, () => expect(holiday.validTo).toBe(expected));
});

describe.each([
  ['holiday-status.empty', HolidayStatus.OFFICIAL_HOLIDAY],
  ['holiday-status.not-specified', HolidayStatus.OFFICIAL_HOLIDAY],
  ['holiday-status.official', HolidayStatus.OFFICIAL_HOLIDAY],
  ['holiday-status.unofficial', HolidayStatus.UNOFFICIAL_HOLIDAY]
])('base holiday holiday status', (fileName: string, expected: HolidayStatus) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const validation = configuration.validate();
  test(`${fileName} - validation length`, () => expect(validation.length).toBe(0));
  const holiday = configuration.holidayCollection[0];
  test(`${fileName} - holiday status`, () => expect(HolidayStatus[holiday.holidayStatus]).toBe(HolidayStatus[expected]));
});

describe.each([
  ['invalid.cycle-type.six-years.missing-from', 1],
  ['invalid.cycle-type.two-years.missing-from', 1],
  ['invalid.from-alphanumeric', 1],
  ['invalid.holiday-status-value', 1],
  ['invalid.key-empty', 1],
  ['invalid.to-alphanumeric', 1],
  ['invalid.to-lt-from', 1],
  ['invalid.cycle-type.five-years.missing-from', 1],
  ['invalid.cycle-type.four-years.missing-from', 1],
  ['invalid.cycle-type.value', 1]
])('invalid base holiday configurations', (fileName: string, expected: number) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const validation = configuration.validate();
  test(`${fileName} - validation length`, () => expect(validation.length).toBe(1));
});
