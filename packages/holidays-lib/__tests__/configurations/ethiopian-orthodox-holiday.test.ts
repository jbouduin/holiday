import * as path from 'path';

import { Configuration } from '../../src/configuration/configuration';
import { EthiopianOrthodoxHolidayType } from '../../src/configuration/holidays/ethiopian-orthodox-holiday-type';
import { CycleType } from '../../src/configuration/holidays/cycle-type';
import { BaseHoliday } from '../../src/configuration/holidays/base-holiday';
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
  expect(ethiopianOrthodoxHoliday.validFrom).toBe(BaseHoliday.undefinedValidTo);
  expect(ethiopianOrthodoxHoliday.validTo).toBe(BaseHoliday.undefinedValidTo);
  expect(ethiopianOrthodoxHoliday.type).toBe(EthiopianOrthodoxHolidayType.ENKUTATASH);
  expect(ethiopianOrthodoxHoliday.translationKey).toBe('ENKUTATASH');
});

test(`invalid Ehtiopian-orthodox Holiday`, () => {
  const fileName = path.join(__dirname, `${dataRoot}/${type}/invalid.json`);
  const validation = Configuration.loadByFileName(fileName).validate();
  expect(validation.length).toBe(3);
});
