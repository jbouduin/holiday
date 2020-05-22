import * as path from 'path';

import { Configuration } from '../../src/configuration/configuration';
import { EthiopianOrthodoxHolidayType } from '../../src/configuration/holidays/ethiopian-orthodox-holiday-type';
import { IEthiopianOrthodoxHoliday } from '../../src/configuration/holidays/ethiopian-orthodox-holiday';
import { CycleType } from '../../src/configuration/holidays/cycle-type';
import { BaseHoliday } from '../../src/configuration/holidays/base-holiday';
import { HolidayStatus } from '../../src/configuration/holidays/holiday-status';
import { HolidayType } from '../../src/configuration/holidays/holiday-type';

const dataRoot = './data';
const type = 'ethiopian-orthodox-holiday';

describe(`${type}-only-type`, () => {
  const current = 'only-type';
  const fileName = path.join(__dirname, `${dataRoot}/${type}/${current}.json`);
  const configuration = Configuration.loadByFileName(fileName);
  test('hierarchy', () => expect(configuration.hierarchy).toBe(`${type}-${current}`));
  test('description', () => expect(configuration.description).toBe(`${type}-${current}`));
  test('collection size', () => expect(configuration.holidayCollection.length).toBe(1));
  const ethiopianOrthodoxHoliday: IEthiopianOrthodoxHoliday = configuration.holidayCollection[0] as IEthiopianOrthodoxHoliday;
  test('holidayType', () => expect(ethiopianOrthodoxHoliday.holidayType).toBe(HolidayType.ETHIOPIAN_ORTHODOX));
  test('cycleType', () => expect(ethiopianOrthodoxHoliday.cycleType).toBe(CycleType.EVERY_YEAR));
  test('holidayStatus', () => expect(ethiopianOrthodoxHoliday.holidayStatus).toBe(HolidayStatus.OFFICIAL_HOLIDAY));
  test('validFrom', () => expect(ethiopianOrthodoxHoliday.validFrom).toBe(BaseHoliday.undefinedValidTo));
  test('validTo', () => expect(ethiopianOrthodoxHoliday.validTo).toBe(BaseHoliday.undefinedValidTo));
  test('key', () => expect(ethiopianOrthodoxHoliday.key).toBe(EthiopianOrthodoxHolidayType.ENKUTATASH));
  test('translationKey', () => expect(ethiopianOrthodoxHoliday.translationKey).toBe('ENKUTATASH'));
});

describe(`Invalid Ethiopian-orthodox Configurations`, () => {
  const fileName = path.join(__dirname, `${dataRoot}/${type}/invalid.json`);
  const configuration = Configuration.loadByFileName(fileName);
  test('collection size', () => expect(configuration.holidayCollection.length).toBe(3));
  const validation = configuration.validate();
  test('number of errors', () => expect(validation.length).toBe(3));
});
