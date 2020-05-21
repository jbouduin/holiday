import * as fs from 'fs';
import * as path from 'path';

import { Configuration } from '../../src/configuration/configuration';
import { IslamicHolidayType } from '../../src/configuration/holidays/islamic-holiday-type';
import { CycleType } from '../../src/configuration/holidays/cycle-type';
import { Holiday } from '../../src/configuration/holidays/holiday';
import { HolidayType } from '../../src/configuration/holidays/holiday-type';

const dataRoot = './data';
const type = 'islamic-holiday';

test(`${type}-only-type`, () => {
  const current = 'only-type';
  const fileName = path.join(__dirname, `${dataRoot}/${type}/${current}.json`);
  const configuration = Configuration.loadByFileName(fileName);
  expect(configuration.hierarchy).toBe(`${type}-${current}`);
  expect(configuration.description).toBe(`${type}-${current}`);
  expect(configuration.holidayCollection.islamicHolidays.length === 1);
  const islamicHoliday = configuration.holidayCollection.islamicHolidays[0];
  expect(islamicHoliday.cycleType).toBe(CycleType.EVERY_YEAR);
  expect(islamicHoliday.holidayType).toBe(HolidayType.OFFICIAL_HOLIDAY);
  expect(islamicHoliday.validFrom).toBe(Holiday.undefinedValidTo);
  expect(islamicHoliday.validTo).toBe(Holiday.undefinedValidTo);
  expect(islamicHoliday.type).toBe(IslamicHolidayType.ASCHURA);
  expect(islamicHoliday.translationKey).toBe('ASCHURA');
});
