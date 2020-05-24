import * as path from 'path';

import { Configuration } from '../../src/configuration';
import { IEthiopianOrthodoxHoliday, EthiopianOrthodoxHolidayType } from '../../src/configuration';


const dataRoot = './data/ethiopian-orthodox-holiday';

describe.each([
  ['holiday-type.enkutatash', EthiopianOrthodoxHolidayType.ENKUTATASH],
  ['holiday-type.meskel', EthiopianOrthodoxHolidayType.MESKEL],
  ['holiday-type.timkat', EthiopianOrthodoxHolidayType.TIMKAT]
])('Ethiopian Orthodox ', (fileName: string, expected: EthiopianOrthodoxHolidayType) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const validation = configuration.validate();
  test(`${fileName} - validation length`, () => expect(validation.length).toBe(0));
  const holiday: IEthiopianOrthodoxHoliday = configuration.holidayCollection[0] as IEthiopianOrthodoxHoliday;
  test(`${fileName} - EthiopianOrthodoxHolidayType`,
     () => expect(EthiopianOrthodoxHolidayType[holiday.key]).toBe(EthiopianOrthodoxHolidayType[expected]));
})

describe.each([
  ['invalid.empty-holiday-type'],
  ['invalid.holiday-type-value'],
  ['invalid.missing-holiday-type']
])('Ethiopian Orthodox invalid configurations', (fileName: string) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const validation = configuration.validate();
  test(`${fileName} - validation length`, () => expect(validation.length).toBe(1));
})
