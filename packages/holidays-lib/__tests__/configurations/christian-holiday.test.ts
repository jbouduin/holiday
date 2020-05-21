import * as path from 'path';

import { Configuration } from '../../src/configuration/configuration';
import { ChristianHolidayType } from '../../src/configuration/holidays/christian-holiday-type';
import { ChronologyType } from '../../src/configuration/holidays/chronology-type';
import { CycleType } from '../../src/configuration/holidays/cycle-type';
import { Holiday } from '../../src/configuration/holidays/holiday';
import { HolidayType } from '../../src/configuration/holidays/holiday-type';

const dataRoot = './data';
const type = 'christian-holiday';

test(`${type}-only-type`, () => {
  const current = 'only-type';
  const fileName = path.join(__dirname, `${dataRoot}/${type}/${current}.json`);
  const configuration = Configuration.loadByFileName(fileName);
  expect(configuration.hierarchy).toBe(`${type}-${current}`);
  expect(configuration.description).toBe(`${type}-${current}`);
  expect(configuration.holidayCollection.christianHolidays.length === 1);
  const christianHoliday = configuration.holidayCollection.christianHolidays[0];
  expect(christianHoliday.cycleType).toBe(CycleType.EVERY_YEAR);
  expect(christianHoliday.holidayType).toBe(HolidayType.OFFICIAL_HOLIDAY);
  expect(christianHoliday.validFrom).toBe(Holiday.undefinedValidTo);
  expect(christianHoliday.validTo).toBe(Holiday.undefinedValidTo);
  expect(christianHoliday.type).toBe(ChristianHolidayType.ASCENSION_DAY);
  expect(christianHoliday.chronology).toBe(ChronologyType.GREGORIAN);
  expect(christianHoliday.translationKey).toBe('ASCENSION_DAY');
});

test(`${type}-chronology-type`, () => {
  const current = 'chronology-type';
  const fileName = path.join(__dirname, `${dataRoot}/${type}/${current}.json`);
  const configuration = Configuration.loadByFileName(fileName);
  expect(configuration.hierarchy).toBe(`${type}-${current}`);
  expect(configuration.description).toBe(`${type}-${current}`);
  expect(configuration.holidayCollection.christianHolidays.length === 1);
  const christianHoliday = configuration.holidayCollection.christianHolidays[0];
  expect(christianHoliday.cycleType).toBe(CycleType.EVERY_YEAR);
  expect(christianHoliday.holidayType).toBe(HolidayType.OFFICIAL_HOLIDAY);
  expect(christianHoliday.validFrom).toBe(Holiday.undefinedValidTo);
  expect(christianHoliday.validTo).toBe(Holiday.undefinedValidTo);
  expect(christianHoliday.type).toBe(ChristianHolidayType.ASCENSION_DAY);
  expect(christianHoliday.chronology).toBe(ChronologyType.JULIAN);
});

test(`invalid Christian Holiday`, () => {
  const fileName = path.join(__dirname, `${dataRoot}/${type}/invalid.json`);
  const validation = Configuration.loadByFileName(fileName).validate();
  expect(validation.length).toBe(3);
});
