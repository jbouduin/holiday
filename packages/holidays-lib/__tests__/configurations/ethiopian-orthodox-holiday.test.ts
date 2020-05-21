import * as fs from 'fs';
import * as path from 'path';

import { Configuration } from '../../src/configuration/configuration';
import { EthiopianOrthodoxHolidayType } from '../../src/configuration/holidays/ethiopian-orthodox-holiday-type';
import { CycleType } from '../../src/configuration/holidays/cycle-type';
import { Holiday } from '../../src/configuration/holidays/holiday';
import { HolidayType } from '../../src/configuration/holidays/holiday-type';

const dataRoot = './data';
const type = 'ethiopian-orthodox-holiday';

test(`${type}-only-type`, () => {
  const current = 'only-type';
  const fileName = path.join(__dirname, `${dataRoot}/${type}/${current}.json`);
  const configuration = Configuration.loadByFileName(fileName);
  expect(configuration.hierarchy).toBe(`${type}-${current}`);
  expect(configuration.description).toBe(`${type}-${current}`);
  expect(configuration.holidayCollection.ethiopianOrthodoxHolidays.length === 1);
  const ethiopianOrthodoxHoliday = configuration.holidayCollection.ethiopianOrthodoxHolidays[0];
  expect(ethiopianOrthodoxHoliday.cycleType).toBe(CycleType.EVERY_YEAR);
  expect(ethiopianOrthodoxHoliday.holidayType).toBe(HolidayType.OFFICIAL_HOLIDAY);
  expect(ethiopianOrthodoxHoliday.validFrom).toBe(Holiday.undefinedValidTo);
  expect(ethiopianOrthodoxHoliday.validTo).toBe(Holiday.undefinedValidTo);
  expect(ethiopianOrthodoxHoliday.type).toBe(EthiopianOrthodoxHolidayType.ENKUTATASH);
  expect(ethiopianOrthodoxHoliday.translationKey).toBe('ENKUTATASH');
});
