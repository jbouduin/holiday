import * as path from 'path';

// import { Configuration } from '../../src/configuration';
import { ConfigurationFactory } from '../../src/configuration';
import { ErrorKeys } from '../../src/configuration';
import { IIslamicHoliday, IslamicHolidayType } from '../../src/configuration';

const dataRoot = './data/islamic-holiday';

describe.each([
  ['type.aschura', IslamicHolidayType.ASCHURA],
  ['type.id_al_fitr', IslamicHolidayType.ID_AL_FITR],
  ['type.id_ul_adha', IslamicHolidayType.ID_UL_ADHA],
  ['type.lailat_al_barat', IslamicHolidayType.LAILAT_AL_BARAT],
  ['type.lailat_al_miraj', IslamicHolidayType.LAILAT_AL_MIRAJ],
  ['type.lailat_al_qadr', IslamicHolidayType.LAILAT_AL_QADR],
  ['type.mawlid_an_nabi', IslamicHolidayType.MAWLID_AN_NABI],
  ['type.newyear', IslamicHolidayType.NEWYEAR],
  ['type.ramadan', IslamicHolidayType.RAMADAN]
])('Islamic holiday', (fileName: string, expected: IslamicHolidayType) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`${fileName} > number of errors`, () => expect(configuration.errors.length).toBe(0));
  test(`${fileName} > number of holidays`, () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday: IIslamicHoliday = configuration.holidayCollection[0] as IIslamicHoliday;
  test(`${fileName} > type`, () => expect(IslamicHolidayType[holiday.key]).toBe(IslamicHolidayType[expected]));
})

describe.each([
  ['invalid.type.empty', ErrorKeys.ISLAMIC_TYPE_MISSING],
  ['invalid.type.value', ErrorKeys.ISLAMIC_TYPE_INVALID],
  ['invalid.type.missing', ErrorKeys.ISLAMIC_TYPE_MISSING]
])('Islamic holiday invalid configurations', (fileName: string, key: ErrorKeys) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`${fileName} > number of holidays`, () => expect(configuration.holidayCollection.length).toBe(0));
  test(`${fileName} > number of errors`, () => expect(configuration.errors.length).toBe(2));
  const noValidHolidaysError = configuration.errors.filter(error => error.key === ErrorKeys.NO_VALID_HOLIDAYS_IN_COLLECTION);
  test(`${fileName} >  NO_VALID_HOLIDAYS_IN_COLLECTION error exists`, () => expect(noValidHolidaysError.length).toBe(1));
  const expectedError = configuration.errors.filter(error => error.key === key);
  test(`${fileName} > expected error exists`, () => expect(expectedError.length).toBe(1));
})

describe('Islamic holiday > translation key', () => {
  const file = path.join(__dirname, `${dataRoot}/translation-key.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`number of errors`, () => expect(configuration.errors.length).toBe(0));
  test(`number of holidays`, () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday = configuration.holidayCollection[0];
  test(`translation-key`, () => expect(holiday.translationKey).toBeDefined());
});
