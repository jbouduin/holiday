import * as path from 'path';

import { Configuration } from '../../src/configuration/configuration';
import { CycleType } from '../../src/configuration/holidays/cycle-type';
import { BaseHoliday } from '../../src/configuration/holidays/base-holiday';
import { IFixedDateHoliday } from '../../src/configuration/holidays/fixed-date-holiday';
import { HolidayStatus } from '../../src/configuration/holidays/holiday-status';
import { HolidayType } from '../../src/configuration/holidays/holiday-type';
import { Month } from '../../src/configuration/holidays/month';

const dataRoot = './data';
const type = 'fixed-holiday';

// The tests on fixed-date configuration also tests the base-holiday properties
describe(`${type}-only-key`, () => {
  const current = 'only-key';
  const fileName = path.join(__dirname, `${dataRoot}/${type}/${current}.json`);
  const configuration = Configuration.loadByFileName(fileName);
  test('hierarchy', () => expect(configuration.hierarchy).toBe(`${type}-${current}`));
  test('description', () => expect(configuration.description).toBe(`${type}-${current}`));
  test('collection size', () => expect(configuration.holidayCollection.length).toBe(1));
  const fixedHoliday: IFixedDateHoliday = configuration.holidayCollection[0] as IFixedDateHoliday;
  test('holidayType', () => expect(fixedHoliday.holidayType).toBe(HolidayType.FIXED_DATE));
  test('cycleType', () => expect(fixedHoliday.cycleType).toBe(CycleType.EVERY_YEAR));
  test('holidayStatus', () => expect(fixedHoliday.holidayStatus).toBe(HolidayStatus.OFFICIAL_HOLIDAY));
  test('validFrom', () => expect(fixedHoliday.validFrom).toBe(BaseHoliday.undefinedValidTo));
  test('validTo', () => expect(fixedHoliday.validTo).toBe(BaseHoliday.undefinedValidTo));
  test('month', () => expect(fixedHoliday.month).toBe(Month.JANUARY));
  test('day', () => expect(fixedHoliday.day).toBe(1));
  test('key', () => expect(fixedHoliday.key).toBe('NEW_YEAR'));
  test('translationKey', () => expect(fixedHoliday.translationKey).toBe('NEW_YEAR'));
});

describe(`${type}-valid-to`, () => {
  const current = 'valid-to';
  const fileName = path.join(__dirname, `${dataRoot}/${type}/${current}.json`);
  const configuration = Configuration.loadByFileName(fileName);
  test('hierarchy', () => expect(configuration.hierarchy).toBe(`${type}-${current}`));
  test('description', () => expect(configuration.description).toBe(`${type}-${current}`));
  test('collection size', () => expect(configuration.holidayCollection.length).toBe(1));
  const fixedHoliday: IFixedDateHoliday = configuration.holidayCollection[0] as IFixedDateHoliday;
  test('holidayType', () => expect(fixedHoliday.holidayType).toBe(HolidayType.FIXED_DATE));
  test('cycleType', () => expect(fixedHoliday.cycleType).toBe(CycleType.EVERY_YEAR));
  test('holidayStatus', () => expect(fixedHoliday.holidayStatus).toBe(HolidayStatus.OFFICIAL_HOLIDAY));
  test('validFrom', () => expect(fixedHoliday.validFrom).toBe(BaseHoliday.undefinedValidTo));
  test('validTo', () => expect(fixedHoliday.validTo).toBe(1985));
  test('month', () => expect(fixedHoliday.month).toBe(Month.JANUARY));
  test('day', () => expect(fixedHoliday.day).toBe(1));
  test('key', () => expect(fixedHoliday.key).toBe('NEW_YEAR'));
  test('translationKey', () => expect(fixedHoliday.translationKey).toBe('NEW_YEAR'));
});

describe(`${type}-valid-from`, () => {
  const current = 'valid-from';
  const fileName = path.join(__dirname, `${dataRoot}/${type}/${current}.json`);
  const configuration = Configuration.loadByFileName(fileName);
  test('hierarchy', () => expect(configuration.hierarchy).toBe(`${type}-${current}`));
  test('description', () => expect(configuration.description).toBe(`${type}-${current}`));
  test('collection size', () => expect(configuration.holidayCollection.length).toBe(1));
  const fixedHoliday: IFixedDateHoliday = configuration.holidayCollection[0] as IFixedDateHoliday;
  test('holidayType', () => expect(fixedHoliday.holidayType).toBe(HolidayType.FIXED_DATE));
  test('cycleType', () => expect(fixedHoliday.cycleType).toBe(CycleType.EVERY_YEAR));
  test('holidayStatus', () => expect(fixedHoliday.holidayStatus).toBe(HolidayStatus.OFFICIAL_HOLIDAY));
  test('validFrom', () => expect(fixedHoliday.validFrom).toBe(1985));
  test('validTo', () => expect(fixedHoliday.validTo).toBe(BaseHoliday.undefinedValidTo));
  test('month', () => expect(fixedHoliday.month).toBe(Month.JANUARY));
  test('day', () => expect(fixedHoliday.day).toBe(1));
  test('key', () => expect(fixedHoliday.key).toBe('NEW_YEAR'));
  test('translationKey', () => expect(fixedHoliday.translationKey).toBe('NEW_YEAR'));
});

describe(`${type}-holiday-status`, () => {
  const current = 'holiday-status';
  const fileName = path.join(__dirname, `${dataRoot}/${type}/${current}.json`);
  const configuration = Configuration.loadByFileName(fileName);
  test('hierarchy', () => expect(configuration.hierarchy).toBe(`${type}-${current}`));
  test('description', () => expect(configuration.description).toBe(`${type}-${current}`));
  test('collection size', () => expect(configuration.holidayCollection.length).toBe(1));
  const fixedHoliday: IFixedDateHoliday = configuration.holidayCollection[0] as IFixedDateHoliday;
  test('holidayType', () => expect(fixedHoliday.holidayType).toBe(HolidayType.FIXED_DATE));
  test('cycleType', () => expect(fixedHoliday.cycleType).toBe(CycleType.EVERY_YEAR));
  test('holidayStatus', () => expect(fixedHoliday.holidayStatus).toBe(HolidayStatus.UNOFFICIAL_HOLIDAY));
  test('validFrom', () => expect(fixedHoliday.validFrom).toBe(BaseHoliday.undefinedValidTo));
  test('validTo', () => expect(fixedHoliday.validTo).toBe(BaseHoliday.undefinedValidTo));
  test('month', () => expect(fixedHoliday.month).toBe(Month.JANUARY));
  test('day', () => expect(fixedHoliday.day).toBe(1));
  test('key', () => expect(fixedHoliday.key).toBe('NEW_YEAR'));
  test('translationKey', () => expect(fixedHoliday.translationKey).toBe('NEW_YEAR'));
});

describe(`${type}-cycle-type`, () => {
  const current = 'cycle-type';
  const fileName = path.join(__dirname, `${dataRoot}/${type}/${current}.json`);
  const configuration = Configuration.loadByFileName(fileName);
  test('hierarchy', () => expect(configuration.hierarchy).toBe(`${type}-${current}`));
  test('description', () => expect(configuration.description).toBe(`${type}-${current}`));
  test('collection size', () => expect(configuration.holidayCollection.length).toBe(1));
  const fixedHoliday: IFixedDateHoliday = configuration.holidayCollection[0] as IFixedDateHoliday;
  test('holidayType', () => expect(fixedHoliday.holidayType).toBe(HolidayType.FIXED_DATE));
  test('cycleType', () => expect(fixedHoliday.cycleType).toBe(CycleType.ODD_YEARS));
  test('holidayStatus', () => expect(fixedHoliday.holidayStatus).toBe(HolidayStatus.OFFICIAL_HOLIDAY));
  test('validFrom', () => expect(fixedHoliday.validFrom).toBe(BaseHoliday.undefinedValidTo));
  test('validTo', () => expect(fixedHoliday.validTo).toBe(BaseHoliday.undefinedValidTo));
  test('month', () => expect(fixedHoliday.month).toBe(Month.JANUARY));
  test('day', () => expect(fixedHoliday.day).toBe(1));
  test('key', () => expect(fixedHoliday.key).toBe('NEW_YEAR'));
  test('translationKey', () => expect(fixedHoliday.translationKey).toBe('NEW_YEAR'));
});

describe(`Invalid Fixed-date Configurations`, () => {
  const fileName = path.join(__dirname, `${dataRoot}/${type}/invalid.json`);
  const configuration = Configuration.loadByFileName(fileName);
  test('collection size', () => expect(configuration.holidayCollection.length).toBe(7));
  const validation = configuration.validate();
  test('number of errors', () => expect(validation.length).toBe(7));
});
