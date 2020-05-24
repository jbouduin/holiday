import * as path from 'path';

import { Configuration } from '../../src/configuration';
import { IChristianHoliday, ChristianHolidayType, ChronologyType } from '../../src/configuration';


const dataRoot = './data/christian-holiday';

describe.each([
  ['holiday-type.ascension_day', ChristianHolidayType.ASCENSION_DAY],
  ['holiday-type.ash_wednesday', ChristianHolidayType.ASH_WEDNESDAY],
  ['holiday-type.carnival', ChristianHolidayType.CARNIVAL],
  ['holiday-type.clean_monday', ChristianHolidayType.CLEAN_MONDAY],
  ['holiday-type.corpus_christi', ChristianHolidayType.CORPUS_CHRISTI],
  ['holiday-type.easter_monday', ChristianHolidayType.EASTER_MONDAY],
  ['holiday-type.easter_saturday', ChristianHolidayType.EASTER_SATURDAY],
  ['holiday-type.easter_tuesday', ChristianHolidayType.EASTER_TUESDAY],
  ['holiday-type.easter', ChristianHolidayType.EASTER],
  ['holiday-type.general_prayer_day', ChristianHolidayType.GENERAL_PRAYER_DAY],
  ['holiday-type.good_friday', ChristianHolidayType.GOOD_FRIDAY],
  ['holiday-type.mardi_gras', ChristianHolidayType.MARDI_GRAS],
  ['holiday-type.maundy_thursday', ChristianHolidayType.MAUNDY_THURSDAY],
  ['holiday-type.pentecost_monday', ChristianHolidayType.PENTECOST_MONDAY],
  ['holiday-type.pentecost', ChristianHolidayType.PENTECOST],
  ['holiday-type.sacred_heart', ChristianHolidayType.SACRED_HEART],
  ['holiday-type.shrove_monday', ChristianHolidayType.SHROVE_MONDAY],
  ['holiday-type.whit_sunday', ChristianHolidayType.WHIT_SUNDAY],
  ['holiday-type.whit_monday', ChristianHolidayType.WHIT_MONDAY]
])('Christian holiday ', (fileName: string, expected: ChristianHolidayType) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const validation = configuration.validate();
  test(`${fileName} - validation length`, () => expect(validation.length).toBe(0));
  const holiday: IChristianHoliday = configuration.holidayCollection[0] as IChristianHoliday;
  test(`${fileName} - EthiopianOrthodoxHolidayType`,
     () => expect(ChristianHolidayType[holiday.key]).toBe(ChristianHolidayType[expected]));
})

describe.each([
  ['chronology-type.empty', ChronologyType.GREGORIAN],
  ['chronology-type.gregorian', ChronologyType.GREGORIAN],
  ['chronology-type.julian', ChronologyType.JULIAN],
  ['chronology-type.not-specified', ChronologyType.GREGORIAN]
])('Christian holiday chronology', (fileName: string, expected: ChronologyType) => {
    const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
    const configuration = Configuration.loadByFileName(file);
    test(`${fileName} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
    const validation = configuration.validate();
    test(`${fileName} - validation length`, () => expect(validation.length).toBe(0));
    const holiday: IChristianHoliday = configuration.holidayCollection[0] as IChristianHoliday;
    test(`${fileName} - ChronologyType`,
       () => expect(ChronologyType[holiday.chronology]).toBe(ChronologyType[expected]));
  })

describe.each([
  ['invalid.chronology-type-value'],
  ['invalid.empty-holiday-type'],
  ['invalid.holiday-type-value'],
  ['invalid.missing-holiday-type']
])('Christian Holiday invalid configurations', (fileName: string) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const validation = configuration.validate();
  test(`${fileName} - validation length`, () => expect(validation.length).toBe(1));
})

describe('Christian holiday translation key', () => {
  const file = path.join(__dirname, `${dataRoot}/translation-key.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`translation-key - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday = configuration.holidayCollection[0];
  test(`translation-key - key`, () => expect(holiday.translationKey).toBeDefined());
});
