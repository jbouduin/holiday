import { ErrorKey } from '../../src/configuration';
import { IIslamicHoliday, IslamicHolidayType } from '../../src/configuration';
import { HolidayType } from '../../src/configuration';
import { Loader } from '../loader';

const dataRoot = './configurations/data/islamic-holiday';

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
])('Islamic holiday > type > %s', (fileName: string, expected: IslamicHolidayType) => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/${fileName}.json`);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday: IIslamicHoliday = configuration.holidays[0] as IIslamicHoliday;
  test(`type value`, () => expect(IslamicHolidayType[holiday.key]).toBe(IslamicHolidayType[expected]));
})

describe.each([
  ['invalid.type.empty', ErrorKey.ISLAMIC_TYPE_MISSING],
  ['invalid.type.value', ErrorKey.ISLAMIC_TYPE_INVALID],
  ['invalid.type.missing', ErrorKey.ISLAMIC_TYPE_MISSING]
])('Islamic holiday > invalid configurations > %s', (fileName: string, key: ErrorKey) => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/${fileName}.json`);
  test('number of holidays', () => expect(configuration.holidays.length).toBe(0));
  test('number of errors', () => expect(configuration.errors.length).toBe(2));
  const noValidHolidaysError = configuration.errors.filter(error => error.key === ErrorKey.NO_VALID_HOLIDAYS_IN_COLLECTION);
  test('NO_VALID_HOLIDAYS_IN_COLLECTION error exists', () => expect(noValidHolidaysError.length).toBe(1));
  const expectedError = configuration.errors.filter(error => error.key === key);
  test('expected error exists', () => expect(expectedError.length).toBe(1));
})

describe('Islamic holiday > translation key', () => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/translation-key.json`);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday = configuration.holidays[0];
  test(`translation-key`, () => expect(holiday.translationKey).toBeDefined());
});

describe('Islamic holiday > holidayType', () => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/holiday-type.json`);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday = configuration.holidays[0];
  test(
    `holidayType value`,
    () => expect(HolidayType[holiday.holidayType]).toBe(HolidayType[HolidayType.ISLAMIC]));
});
