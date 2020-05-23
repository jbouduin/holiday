import * as path from 'path';
import { ChristianHolidayCalculator } from '../../src/calculators';
import { Configuration, IChristianHoliday } from '../../src/configuration';

const dataRoot = './data/christian';

describe.each([
  // Easter Julian
  // Easter Gregorian: Source https://en.wikipedia.org/wiki/List_of_dates_for_Easter retrieved on 2020.05.23
  ['easter-gregorian', 2000, new Date(2000, 3, 23)],
  ['easter-gregorian', 2001, new Date(2001, 3, 15)],
  ['easter-gregorian', 2002, new Date(2002, 2, 31)],
  ['easter-gregorian', 2003, new Date(2003, 3, 20)],
  ['easter-gregorian', 2004, new Date(2004, 3, 11)],
  ['easter-gregorian', 2005, new Date(2005, 2, 27)],
  ['easter-gregorian', 2006, new Date(2006, 3, 16)],
  ['easter-gregorian', 2007, new Date(2007, 3, 8)],
  ['easter-gregorian', 2008, new Date(2008, 2, 23)],
  ['easter-gregorian', 2009, new Date(2009, 3, 12)],
  ['easter-gregorian', 2010, new Date(2010, 3, 4)],
  ['easter-gregorian', 2011, new Date(2011, 3, 24)],
  ['easter-gregorian', 2012, new Date(2012, 3, 8)],
  ['easter-gregorian', 2013, new Date(2013, 2, 31)],
  ['easter-gregorian', 2014, new Date(2014, 3, 20)],
  ['easter-gregorian', 2015, new Date(2015, 3, 5)],
  ['easter-gregorian', 2016, new Date(2016, 2, 27)],
  ['easter-gregorian', 2017, new Date(2017, 3, 16)],
  ['easter-gregorian', 2018, new Date(2018, 3, 1)],
  ['easter-gregorian', 2019, new Date(2019, 3, 21)],
  ['easter-gregorian', 2020, new Date(2020, 3, 12)],
  ['easter-gregorian', 2021, new Date(2021, 3, 4)],
  ['easter-gregorian', 2022, new Date(2022, 3, 17)],
  ['easter-gregorian', 2023, new Date(2023, 3, 9)],
  ['easter-gregorian', 2024, new Date(2024, 2, 31)],
  ['easter-gregorian', 2025, new Date(2025, 3, 20)],
  ['easter-gregorian', 2026, new Date(2026, 3, 5)],
  ['easter-gregorian', 2027, new Date(2027, 2, 28)],
  ['easter-gregorian', 2028, new Date(2028, 3, 16)],
  ['easter-gregorian', 2029, new Date(2029, 3, 1)],
  ['easter-gregorian', 2030, new Date(2030, 3, 21)],
  ['easter-gregorian', 2031, new Date(2031, 3, 13)],
  ['easter-gregorian', 2032, new Date(2032, 2, 28)],
  ['easter-gregorian', 2033, new Date(2033, 3, 17)],
  ['easter-gregorian', 2034, new Date(2034, 3, 9)],
  ['easter-gregorian', 2035, new Date(2035, 2, 25)],
  ['easter-gregorian', 2036, new Date(2036, 3, 13)],
  ['easter-gregorian', 2037, new Date(2037, 3, 5)],
  ['easter-gregorian', 2038, new Date(2038, 3, 25)],
  ['easter-gregorian', 2039, new Date(2039, 3, 10)],
  ['easter-gregorian', 2040, new Date(2040, 3, 1)]
  // TODO: easter julian
  /* ,
  ['easter-julian', 2000, new Date(2000, 3, 30)],
  ['easter-julian', 2001, new Date(2001, 3, 15)],
  ['easter-julian', 2002, new Date(2002, 4, 5)],
  ['easter-julian', 2003, new Date(2003, 3, 27)],
  ['easter-julian', 2004, new Date(2004, 3, 11)],
  ['easter-julian', 2005, new Date(2005, 4, 1)],
  ['easter-julian', 2006, new Date(2006, 3, 23)],
  ['easter-julian', 2007, new Date(2007, 3, 8)],
  ['easter-julian', 2008, new Date(2008, 3, 27)],
  ['easter-julian', 2009, new Date(2009, 3, 19)],
  ['easter-julian', 2010, new Date(2010, 3, 4)],
  ['easter-julian', 2011, new Date(2011, 3, 24)],
  ['easter-julian', 2012, new Date(2012, 3, 15)],
  ['easter-julian', 2013, new Date(2013, 4, 5)],
  ['easter-julian', 2014, new Date(2014, 3, 20)],
  ['easter-julian', 2015, new Date(2015, 3, 12)],
  ['easter-julian', 2016, new Date(2016, 5, 1)],
  ['easter-julian', 2017, new Date(2017, 3, 16)],
  ['easter-julian', 2018, new Date(2018, 3, 8)],
  ['easter-julian', 2019, new Date(2019, 3, 28)],
  ['easter-julian', 2020, new Date(2020, 3, 19)],
  ['easter-julian', 2021, new Date(2021, 4, 2)],
  ['easter-julian', 2022, new Date(2022, 3, 24)],
  ['easter-julian', 2023, new Date(2023, 3, 16)],
  ['easter-julian', 2024, new Date(2024, 4, 5)],
  ['easter-julian', 2025, new Date(2025, 3, 20)],
  ['easter-julian', 2026, new Date(2026, 3, 12)],
  ['easter-julian', 2027, new Date(2027, 4, 2)],
  ['easter-julian', 2028, new Date(2028, 3, 16)],
  ['easter-julian', 2029, new Date(2029, 3, 8)],
  ['easter-julian', 2030, new Date(2030, 3, 28)],
  ['easter-julian', 2031, new Date(2031, 3, 13)],
  ['easter-julian', 2032, new Date(2032, 4, 2)],
  ['easter-julian', 2033, new Date(2033, 3, 24)],
  ['easter-julian', 2034, new Date(2034, 3, 9)],
  ['easter-julian', 2035, new Date(2035, 3, 29)],
  ['easter-julian', 2036, new Date(2036, 3, 20)],
  ['easter-julian', 2037, new Date(2037, 3, 5)],
  ['easter-julian', 2038, new Date(2038, 3, 25)],
  ['easter-julian', 2039, new Date(2039, 3, 17)],
  ['easter-julian', 2040, new Date(2040, 4, 6)]
  */
])('fixed date calculators', (fileName, year, expected) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  const validation = configuration.validate();
  test(`${configuration.description} in ${year} - validation`, () => expect(validation.length).toBe(0));
  const holiday: IChristianHoliday = configuration.holidayCollection[0] as IChristianHoliday;

  const calculator = new ChristianHolidayCalculator();
  const result = calculator.calculate(holiday, year);
  test(`${configuration.description} in ${year} - calculation`, () => expect(result).toStrictEqual(expected));

});
