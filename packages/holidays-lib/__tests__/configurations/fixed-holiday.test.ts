import * as path from 'path';

import { Configuration } from '../../src/configuration/configuration';
import { CycleType } from '../../src/configuration/holidays/cycle-type';
import { BaseHoliday } from '../../src/configuration/holidays/base-holiday';
import { HolidayStatus } from '../../src/configuration/holidays/holiday-status';
import { Month } from '../../src/configuration/holidays/month';

const dataRoot = './data';
const type = 'fixed-holiday';

test(`${type}-only-key`, () => {
  const current = 'only-key';
  const fileName = path.join(__dirname, `${dataRoot}/${type}/${current}.json`);
  const configuration = Configuration.loadByFileName(fileName);
  expect(configuration.hierarchy).toBe(`${type}-${current}`);
  expect(configuration.description).toBe(`${type}-${current}`);
  expect(configuration.holidayCollection.fixedHolidays.length === 1);
  const fixedHoliday = configuration.holidayCollection.fixedHolidays[0];
  expect(fixedHoliday.cycleType).toBe(CycleType.EVERY_YEAR);
  expect(fixedHoliday.holidayStatus).toBe(HolidayStatus.OFFICIAL_HOLIDAY);
  expect(fixedHoliday.validFrom).toBe(BaseHoliday.undefinedValidTo);
  expect(fixedHoliday.validTo).toBe(BaseHoliday.undefinedValidTo);
  expect(fixedHoliday.key).toBe('NEW_YEAR');
  expect(fixedHoliday.month).toBe(Month.JANUARY);
  expect(fixedHoliday.day).toBe(1);
  expect(fixedHoliday.translationKey).toBe('NEW_YEAR');
});

test(`${type}-valid-to`, () => {
  const current = 'valid-to';
  const fileName = path.join(__dirname, `${dataRoot}/${type}/${current}.json`);
  const configuration = Configuration.loadByFileName(fileName);
  expect(configuration.hierarchy).toBe(`${type}-${current}`);
  expect(configuration.description).toBe(`${type}-${current}`);
  expect(configuration.holidayCollection.fixedHolidays.length === 1);
  const fixedHoliday = configuration.holidayCollection.fixedHolidays[0];
  expect(fixedHoliday.cycleType).toBe(CycleType.EVERY_YEAR);
  expect(fixedHoliday.holidayStatus).toBe(HolidayStatus.OFFICIAL_HOLIDAY);
  expect(fixedHoliday.validFrom).toBe(BaseHoliday.undefinedValidTo);
  expect(fixedHoliday.validTo).toBe(1985);
  expect(fixedHoliday.key).toBe('NEW_YEAR');
  expect(fixedHoliday.month).toBe(Month.JANUARY);
  expect(fixedHoliday.day).toBe(1);
});

test(`${type}-valid-from`, () => {
  const current = 'valid-from';
  const fileName = path.join(__dirname, `${dataRoot}/${type}/${current}.json`);
  const configuration = Configuration.loadByFileName(fileName);
  expect(configuration.hierarchy).toBe(`${type}-${current}`);
  expect(configuration.description).toBe(`${type}-${current}`);
  expect(configuration.holidayCollection.fixedHolidays.length === 1);
  const fixedHoliday = configuration.holidayCollection.fixedHolidays[0];
  expect(fixedHoliday.cycleType).toBe(CycleType.EVERY_YEAR);
  expect(fixedHoliday.holidayStatus).toBe(HolidayStatus.OFFICIAL_HOLIDAY);
  expect(fixedHoliday.validFrom).toBe(1985);
  expect(fixedHoliday.validTo).toBe(BaseHoliday.undefinedValidTo);
  expect(fixedHoliday.key).toBe('NEW_YEAR');
  expect(fixedHoliday.month).toBe(Month.JANUARY);
  expect(fixedHoliday.day).toBe(1);
});

test(`${type}-holiday-status`, () => {
  const current = 'holiday-status';
  const fileName = path.join(__dirname, `${dataRoot}/${type}/${current}.json`);
  const configuration = Configuration.loadByFileName(fileName);
  expect(configuration.hierarchy).toBe(`${type}-${current}`);
  expect(configuration.description).toBe(`${type}-${current}`);
  expect(configuration.holidayCollection.fixedHolidays.length === 1);
  const fixedHoliday = configuration.holidayCollection.fixedHolidays[0];
  expect(fixedHoliday.cycleType).toBe(CycleType.EVERY_YEAR);
  expect(fixedHoliday.holidayStatus).toBe(HolidayStatus.UNOFFICIAL_HOLIDAY);
  expect(fixedHoliday.validFrom).toBe(BaseHoliday.undefinedValidTo);
  expect(fixedHoliday.validTo).toBe(BaseHoliday.undefinedValidTo);
  expect(fixedHoliday.key).toBe('NEW_YEAR');
  expect(fixedHoliday.month).toBe(Month.JANUARY);
  expect(fixedHoliday.day).toBe(1);
});

test(`${type}-cycle-type`, () => {
  const current = 'cycle-type';
  const fileName = path.join(__dirname, `${dataRoot}/${type}/${current}.json`);
  const configuration = Configuration.loadByFileName(fileName);
  expect(configuration.hierarchy).toBe(`${type}-${current}`);
  expect(configuration.description).toBe(`${type}-${current}`);
  expect(configuration.holidayCollection.fixedHolidays.length === 1);
  const fixedHoliday = configuration.holidayCollection.fixedHolidays[0];
  expect(fixedHoliday.cycleType).toBe(CycleType.ODD_YEARS);
  expect(fixedHoliday.holidayStatus).toBe(HolidayStatus.OFFICIAL_HOLIDAY);
  expect(fixedHoliday.validFrom).toBe(BaseHoliday.undefinedValidTo);
  expect(fixedHoliday.validTo).toBe(BaseHoliday.undefinedValidTo);
  expect(fixedHoliday.key).toBe('NEW_YEAR');
  expect(fixedHoliday.month).toBe(Month.JANUARY);
  expect(fixedHoliday.day).toBe(1);
});

test(`invalid Fixed Holiday`, () => {
  const fileName = path.join(__dirname, `${dataRoot}/${type}/invalid.json`);
  const validation = Configuration.loadByFileName(fileName).validate();
  expect(validation.length).toBe(6);
});
