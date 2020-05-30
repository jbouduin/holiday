import * as path from 'path';

import { ChristianHolidayCalculator } from '../../src/calculators';
import { Holidays } from '../../src/api';
import { IChristianHoliday } from '../../src/configuration';

const dataRoot = './data/christian';

describe.each([
  // Easter Julian
  // Easter Gregorian: Source https://en.wikipedia.org/wiki/List_of_dates_for_Easter retrieved on 2020.05.23
  ['07.easter-gregorian', 2000, new Date(Date.UTC(2000, 3, 23))],
  ['07.easter-gregorian', 2001, new Date(Date.UTC(2001, 3, 15))],
  ['07.easter-gregorian', 2002, new Date(Date.UTC(2002, 2, 31))],
  ['07.easter-gregorian', 2003, new Date(Date.UTC(2003, 3, 20))],
  ['07.easter-gregorian', 2004, new Date(Date.UTC(2004, 3, 11))],
  ['07.easter-gregorian', 2005, new Date(Date.UTC(2005, 2, 27))],
  ['07.easter-gregorian', 2006, new Date(Date.UTC(2006, 3, 16))],
  ['07.easter-gregorian', 2007, new Date(Date.UTC(2007, 3, 8))],
  ['07.easter-gregorian', 2008, new Date(Date.UTC(2008, 2, 23))],
  ['07.easter-gregorian', 2009, new Date(Date.UTC(2009, 3, 12))],
  ['07.easter-gregorian', 2010, new Date(Date.UTC(2010, 3, 4))],
  ['07.easter-gregorian', 2011, new Date(Date.UTC(2011, 3, 24))],
  ['07.easter-gregorian', 2012, new Date(Date.UTC(2012, 3, 8))],
  ['07.easter-gregorian', 2013, new Date(Date.UTC(2013, 2, 31))],
  ['07.easter-gregorian', 2014, new Date(Date.UTC(2014, 3, 20))],
  ['07.easter-gregorian', 2015, new Date(Date.UTC(2015, 3, 5))],
  ['07.easter-gregorian', 2016, new Date(Date.UTC(2016, 2, 27))],
  ['07.easter-gregorian', 2017, new Date(Date.UTC(2017, 3, 16))],
  ['07.easter-gregorian', 2018, new Date(Date.UTC(2018, 3, 1))],
  ['07.easter-gregorian', 2019, new Date(Date.UTC(2019, 3, 21))],
  ['07.easter-gregorian', 2020, new Date(Date.UTC(2020, 3, 12))],
  ['07.easter-gregorian', 2021, new Date(Date.UTC(2021, 3, 4))],
  ['07.easter-gregorian', 2022, new Date(Date.UTC(2022, 3, 17))],
  ['07.easter-gregorian', 2023, new Date(Date.UTC(2023, 3, 9))],
  ['07.easter-gregorian', 2024, new Date(Date.UTC(2024, 2, 31))],
  ['07.easter-gregorian', 2025, new Date(Date.UTC(2025, 3, 20))],
  ['07.easter-gregorian', 2026, new Date(Date.UTC(2026, 3, 5))],
  ['07.easter-gregorian', 2027, new Date(Date.UTC(2027, 2, 28))],
  ['07.easter-gregorian', 2028, new Date(Date.UTC(2028, 3, 16))],
  ['07.easter-gregorian', 2029, new Date(Date.UTC(2029, 3, 1))],
  ['07.easter-gregorian', 2030, new Date(Date.UTC(2030, 3, 21))],
  ['07.easter-gregorian', 2031, new Date(Date.UTC(2031, 3, 13))],
  ['07.easter-gregorian', 2032, new Date(Date.UTC(2032, 2, 28))],
  ['07.easter-gregorian', 2033, new Date(Date.UTC(2033, 3, 17))],
  ['07.easter-gregorian', 2034, new Date(Date.UTC(2034, 3, 9))],
  ['07.easter-gregorian', 2035, new Date(Date.UTC(2035, 2, 25))],
  ['07.easter-gregorian', 2036, new Date(Date.UTC(2036, 3, 13))],
  ['07.easter-gregorian', 2037, new Date(Date.UTC(2037, 3, 5))],
  ['07.easter-gregorian', 2038, new Date(Date.UTC(2038, 3, 25))],
  ['07.easter-gregorian', 2039, new Date(Date.UTC(2039, 3, 10))],
  ['07.easter-gregorian', 2040, new Date(Date.UTC(2040, 3, 1))],
  // easter julian : Carefull: the list on Wikipedia gives the Julian date.
  // ww-holiday returns the Gregorian date of the Julian easter sunday
  ['07.easter-julian', 2000, new Date(Date.UTC(2000, 3, 30))],
  ['07.easter-julian', 2001, new Date(Date.UTC(2001, 3, 15))],
  ['07.easter-julian', 2002, new Date(Date.UTC(2002, 4, 5))],
  ['07.easter-julian', 2003, new Date(Date.UTC(2003, 3, 27))],
  ['07.easter-julian', 2004, new Date(Date.UTC(2004, 3, 11))],
  ['07.easter-julian', 2005, new Date(Date.UTC(2005, 4, 1))],
  ['07.easter-julian', 2006, new Date(Date.UTC(2006, 3, 23))],
  ['07.easter-julian', 2007, new Date(Date.UTC(2007, 3, 8))],
  ['07.easter-julian', 2008, new Date(Date.UTC(2008, 3, 27))],
  ['07.easter-julian', 2009, new Date(Date.UTC(2009, 3, 19))],
  ['07.easter-julian', 2010, new Date(Date.UTC(2010, 3, 4))],
  ['07.easter-julian', 2011, new Date(Date.UTC(2011, 3, 24))],
  ['07.easter-julian', 2012, new Date(Date.UTC(2012, 3, 15))],
  ['07.easter-julian', 2013, new Date(Date.UTC(2013, 4, 5))],
  ['07.easter-julian', 2014, new Date(Date.UTC(2014, 3, 20))],
  ['07.easter-julian', 2015, new Date(Date.UTC(2015, 3, 12))],
  ['07.easter-julian', 2016, new Date(Date.UTC(2016, 4, 1))],
  ['07.easter-julian', 2017, new Date(Date.UTC(2017, 3, 16))],
  ['07.easter-julian', 2018, new Date(Date.UTC(2018, 3, 8))],
  ['07.easter-julian', 2019, new Date(Date.UTC(2019, 3, 28))],
  ['07.easter-julian', 2020, new Date(Date.UTC(2020, 3, 19))],
  ['07.easter-julian', 2021, new Date(Date.UTC(2021, 4, 2))],
  ['07.easter-julian', 2022, new Date(Date.UTC(2022, 3, 24))],
  ['07.easter-julian', 2023, new Date(Date.UTC(2023, 3, 16))],
  ['07.easter-julian', 2024, new Date(Date.UTC(2024, 4, 5))],
  ['07.easter-julian', 2025, new Date(Date.UTC(2025, 3, 20))],
  ['07.easter-julian', 2026, new Date(Date.UTC(2026, 3, 12))],
  ['07.easter-julian', 2027, new Date(Date.UTC(2027, 4, 2))],
  ['07.easter-julian', 2028, new Date(Date.UTC(2028, 3, 16))],
  ['07.easter-julian', 2029, new Date(Date.UTC(2029, 3, 8))],
  ['07.easter-julian', 2030, new Date(Date.UTC(2030, 3, 28))],
  ['07.easter-julian', 2031, new Date(Date.UTC(2031, 3, 13))],
  ['07.easter-julian', 2032, new Date(Date.UTC(2032, 4, 2))],
  ['07.easter-julian', 2033, new Date(Date.UTC(2033, 3, 24))],
  ['07.easter-julian', 2034, new Date(Date.UTC(2034, 3, 9))],
  ['07.easter-julian', 2035, new Date(Date.UTC(2035, 3, 29))],
  ['07.easter-julian', 2036, new Date(Date.UTC(2036, 3, 20))],
  ['07.easter-julian', 2037, new Date(Date.UTC(2037, 3, 5))],
  ['07.easter-julian', 2038, new Date(Date.UTC(2038, 3, 25))],
  ['07.easter-julian', 2039, new Date(Date.UTC(2039, 3, 17))],
  ['07.easter-julian', 2040, new Date(Date.UTC(2040, 4, 6))],
  // all Christian holidays relative to easter
  ['01.shrove-monday', 2020, new Date(Date.UTC(2020, 1, 24))],
  ['01.clean-monday', 2020, new Date(Date.UTC(2020, 1, 24))],
  ['02.carnival', 2020, new Date(Date.UTC(2020, 1, 25))],
  ['02.mardi-gras', 2020, new Date(Date.UTC(2020, 1, 25))],
  ['03.ash-wednesday', 2020, new Date(Date.UTC(2020, 1, 26))],
  ['04.maundy-thursday', 2020, new Date(Date.UTC(2020, 3, 9))],
  ['05.good-friday', 2020, new Date(Date.UTC(2020, 3, 10))],
  ['06.easter-saturday', 2020, new Date(Date.UTC(2020, 3, 11))],
  // eastern 2020 is already tested above
  ['07.easter-monday', 2020, new Date(Date.UTC(2020, 3, 13))],
  ['08.easter-tuesday', 2020, new Date(Date.UTC(2020, 3, 14))],
  ['09.general-prayer-day', 2020, new Date(Date.UTC(2020, 4, 8))],
  ['10.ascension-day', 2020, new Date(Date.UTC(2020, 4, 21))],
  ['11.pentecost', 2020, new Date(Date.UTC(2020, 4, 31))],
  ['11.whit-sunday', 2020, new Date(Date.UTC(2020, 4, 31))],
  ['12.pentecost-monday', 2020, new Date(Date.UTC(2020, 5, 1))],
  ['12.whit-monday', 2020, new Date(Date.UTC(2020, 5, 1))],
  ['13.corpus-christi', 2020, new Date(Date.UTC(2020, 5, 11))],
  ['14.sacred-heart', 2020, new Date(Date.UTC(2020, 5, 19))],
  ['valid-to', 2020, undefined]
])('Christian holiday date calculator', (fileName, year, expected) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new Holidays().loadByFileName(file);
  test(`${fileName} > number of errors`, () => expect(configuration.errors.length).toBe(0));
  test(`${fileName} > number of holidays`, () => expect(configuration.holidays.length).toBe(1));
  const holiday: IChristianHoliday = configuration.holidays[0] as IChristianHoliday;
  const calculator = new ChristianHolidayCalculator();
  const result = calculator.calculate(holiday, year);
  test(`${fileName} in ${year} - calculation`, () => expect(result).toStrictEqual(expected));

});
