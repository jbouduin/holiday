import * as path from 'path';

import { Configuration } from '../../src/configuration';
import { IIslamicHoliday, IslamicHolidayType } from '../../src/configuration';

const dataRoot = './data/islamic-holiday';

describe.each([
  ['holiday-type.aschura', IslamicHolidayType.ASCHURA],
  ['holiday-type.id_al_fitr', IslamicHolidayType.ID_AL_FITR],
  ['holiday-type.id_ul_adha', IslamicHolidayType.ID_UL_ADHA],
  ['holiday-type.lailat_al_barat', IslamicHolidayType.LAILAT_AL_BARAT],
  ['holiday-type.lailat_al_miraj', IslamicHolidayType.LAILAT_AL_MIRAJ],
  ['holiday-type.lailat_al_qadr', IslamicHolidayType.LAILAT_AL_QADR],
  ['holiday-type.mawlid_an_nabi', IslamicHolidayType.MAWLID_AN_NABI],
  ['holiday-type.newyear', IslamicHolidayType.NEWYEAR],
  ['holiday-type.ramadan', IslamicHolidayType.RAMADAN]
])('Islamic holiday', (fileName: string, expected: IslamicHolidayType) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const validation = configuration.validate();
  test(`${fileName} - validation length`, () => expect(validation.length).toBe(0));
  const holiday: IIslamicHoliday = configuration.holidayCollection[0] as IIslamicHoliday;
  test(`${fileName} - EthiopianOrthodoxHolidayType`,
     () => expect(IslamicHolidayType[holiday.key]).toBe(IslamicHolidayType[expected]));
})

describe.each([
  ['invalid.empty-holiday-type'],
  ['invalid.holiday-type-value'],
  ['invalid.missing-holiday-type']
])('Islamic holiday invalid configurations', (fileName: string) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const validation = configuration.validate();
  test(`${fileName} - validation length`, () => expect(validation.length).toBe(1));
})
