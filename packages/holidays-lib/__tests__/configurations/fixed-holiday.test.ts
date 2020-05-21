import * as fs from 'fs';
import * as path from 'path';

import { Configuration } from '../../src/configuration/configuration';
import { CycleType } from '../../src/configuration/holidays/cycle-type';
import { Holiday } from '../../src/configuration/holidays/holiday';
import { HolidayType } from '../../src/configuration/holidays/holiday-type';
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
  expect(fixedHoliday.holidayType).toBe(HolidayType.OFFICIAL_HOLIDAY);
  expect(fixedHoliday.validFrom).toBe(Holiday.undefinedValidTo);
  expect(fixedHoliday.validTo).toBe(Holiday.undefinedValidTo);
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
  expect(fixedHoliday.holidayType).toBe(HolidayType.OFFICIAL_HOLIDAY);
  expect(fixedHoliday.validFrom).toBe(Holiday.undefinedValidTo);
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
  expect(fixedHoliday.holidayType).toBe(HolidayType.OFFICIAL_HOLIDAY);
  expect(fixedHoliday.validFrom).toBe(1985);
  expect(fixedHoliday.validTo).toBe(Holiday.undefinedValidTo);
  expect(fixedHoliday.key).toBe('NEW_YEAR');
  expect(fixedHoliday.month).toBe(Month.JANUARY);
  expect(fixedHoliday.day).toBe(1);
});

test(`${type}-holiday-type`, () => {
  const current = 'holiday-type';
  const fileName = path.join(__dirname, `${dataRoot}/${type}/${current}.json`);
  const configuration = Configuration.loadByFileName(fileName);
  expect(configuration.hierarchy).toBe(`${type}-${current}`);
  expect(configuration.description).toBe(`${type}-${current}`);
  expect(configuration.holidayCollection.fixedHolidays.length === 1);
  const fixedHoliday = configuration.holidayCollection.fixedHolidays[0];
  expect(fixedHoliday.cycleType).toBe(CycleType.EVERY_YEAR);
  expect(fixedHoliday.holidayType).toBe(HolidayType.UNOFFICIAL_HOLIDAY);
  expect(fixedHoliday.validFrom).toBe(Holiday.undefinedValidTo);
  expect(fixedHoliday.validTo).toBe(Holiday.undefinedValidTo);
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
  expect(fixedHoliday.holidayType).toBe(HolidayType.OFFICIAL_HOLIDAY);
  expect(fixedHoliday.validFrom).toBe(Holiday.undefinedValidTo);
  expect(fixedHoliday.validTo).toBe(Holiday.undefinedValidTo);
  expect(fixedHoliday.key).toBe('NEW_YEAR');
  expect(fixedHoliday.month).toBe(Month.JANUARY);
  expect(fixedHoliday.day).toBe(1);
});

//holidayCycleType: 5,
  //      holidayType: 0,
