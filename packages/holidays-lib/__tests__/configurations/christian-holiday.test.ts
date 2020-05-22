import * as path from 'path';

import { Configuration } from '../../src/configuration/configuration';
import { ChristianHolidayType } from '../../src/configuration/holidays/christian-holiday-type';
import { IChristianHoliday } from '../../src/configuration/holidays/christian-holiday';
import { ChronologyType } from '../../src/configuration/holidays/chronology-type';
import { CycleType } from '../../src/configuration/holidays/cycle-type';
import { BaseHoliday } from '../../src/configuration/holidays/base-holiday';
import { HolidayStatus } from '../../src/configuration/holidays/holiday-status';
import { HolidayType } from '../../src/configuration/holidays/holiday-type';

const dataRoot = './data';
const type = 'christian-holiday';

describe(`${type}-only-type`, () => {
  const current = 'only-type';
  const fileName = path.join(__dirname, `${dataRoot}/${type}/${current}.json`);
  const configuration = Configuration.loadByFileName(fileName);
  test('hierarchy', () => expect(configuration.hierarchy).toBe(`${type}-${current}`));
  test('description', () => expect(configuration.description).toBe(`${type}-${current}`));
  test('collection size', () => expect(configuration.holidayCollection.length).toBe(1));
  const christianHoliday: IChristianHoliday = configuration.holidayCollection[0] as IChristianHoliday;
  test('holidayType', () => expect(christianHoliday.holidayType).toBe(HolidayType.CHRISTIAN));
  test('cycleType', () => expect(christianHoliday.cycleType).toBe(CycleType.EVERY_YEAR));
  test('holidayStatus', () => expect(christianHoliday.holidayStatus).toBe(HolidayStatus.OFFICIAL_HOLIDAY));
  test('validFrom', () => expect(christianHoliday.validFrom).toBe(BaseHoliday.undefinedValidTo));
  test('validTo', () => expect(christianHoliday.validTo).toBe(BaseHoliday.undefinedValidTo));
  test('key', () => expect(christianHoliday.key).toBe(ChristianHolidayType.ASCENSION_DAY));
  test('chronology', () => expect(christianHoliday.chronology).toBe(ChronologyType.GREGORIAN));
  test('translationKey', () => expect(christianHoliday.translationKey).toBe('ASCENSION_DAY'));
});

describe(`${type}-chronology-type`, () => {
  const current = 'chronology-type';
  const fileName = path.join(__dirname, `${dataRoot}/${type}/${current}.json`);
  const configuration = Configuration.loadByFileName(fileName);
  test('hierarchy', () => expect(configuration.hierarchy).toBe(`${type}-${current}`));
  test('description', () => expect(configuration.description).toBe(`${type}-${current}`));
  test('collection size', () => expect(configuration.holidayCollection.length).toBe(1));
  const christianHoliday: IChristianHoliday = configuration.holidayCollection[0] as IChristianHoliday;
  test('holidayType', () => expect(christianHoliday.holidayType).toBe(HolidayType.CHRISTIAN));
  test('cycleType', () => expect(christianHoliday.cycleType).toBe(CycleType.EVERY_YEAR));
  test('holidayStatus', () => expect(christianHoliday.holidayStatus).toBe(HolidayStatus.OFFICIAL_HOLIDAY));
  test('validFrom', () => expect(christianHoliday.validFrom).toBe(BaseHoliday.undefinedValidTo));
  test('validTo', () => expect(christianHoliday.validTo).toBe(BaseHoliday.undefinedValidTo));
  test('key', () => expect(christianHoliday.key).toBe(ChristianHolidayType.ASCENSION_DAY));
  test('chronology', () => expect(christianHoliday.chronology).toBe(ChronologyType.JULIAN));
});

describe(`invalid Christian Holiday Configurations`, () => {
  const fileName = path.join(__dirname, `${dataRoot}/${type}/invalid.json`);
  const configuration = Configuration.loadByFileName(fileName);
  test('collection size', () => expect(configuration.holidayCollection.length).toBe(3));
  const validation = configuration.validate();
  test('number of errors', () => expect(validation.length).toBe(3));
});
