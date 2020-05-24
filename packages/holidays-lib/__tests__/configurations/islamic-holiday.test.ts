import * as path from 'path';

import { Configuration } from '../../src/configuration/configuration';
import { IslamicHolidayType } from '../../src/configuration/holidays/islamic-holiday-type';
import { IslamicHoliday } from '../../src/configuration/holidays/islamic-holiday';
import { CycleType } from '../../src/configuration/holidays/cycle-type';
import { BaseHoliday } from '../../src/configuration/holidays/base-holiday';
import { HolidayStatus } from '../../src/configuration/holidays/holiday-status';
import { HolidayType } from '../../src/configuration/holidays/holiday-type';

const dataRoot = './data';
const type = 'islamic-holiday';

describe(`${type}-only-type`, () => {
  const current = 'only-type';
  const fileName = path.join(__dirname, `${dataRoot}/${type}/${current}.json`);
  const configuration = Configuration.loadByFileName(fileName);
  test('hierarchy', () => expect(configuration.hierarchy).toBe(`${type}-${current}`));
  test('description', () => expect(configuration.description).toBe(`${type}-${current}`));
  test('collection size', () => expect(configuration.holidayCollection.length).toBe(1));
  const islamicHoliday: IslamicHoliday = configuration.holidayCollection[0] as IslamicHoliday;
  test('holidayType', () => expect(islamicHoliday.holidayType).toBe(HolidayType.ISLAMIC));
  test('cycleType', () => expect(islamicHoliday.cycleType).toBe(CycleType.EVERY_YEAR));
  test('holidayStatus', () => expect(islamicHoliday.holidayStatus).toBe(HolidayStatus.OFFICIAL_HOLIDAY));
  test('validFrom', () => expect(islamicHoliday.validFrom).toBe(BaseHoliday.undefinedValidFrom));
  test('validTo', () => expect(islamicHoliday.validTo).toBe(BaseHoliday.undefinedValidTo));
  test('key', () => expect(islamicHoliday.key).toBe(IslamicHolidayType.ASCHURA));
  test('translationKey', () => expect(islamicHoliday.translationKey).toBe('ASCHURA'));
});

describe(`Invalid Islamitic Configurations`, () => {
  const fileName = path.join(__dirname, `${dataRoot}/${type}/invalid.json`);
  const configuration = Configuration.loadByFileName(fileName);
  test('collection size', () => expect(configuration.holidayCollection.length).toBe(3));
  const validation = configuration.validate();
  test('number of errors', () => expect(validation.length).toBe(3));
});
