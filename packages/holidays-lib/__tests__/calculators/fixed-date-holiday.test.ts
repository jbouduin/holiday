import * as path from 'path';
import { FixedHolidayCalculator } from '../../src/calculators';
import { Configuration, IFixedDateHoliday } from '../../src/configuration';

const dataRoot = './data/fixed-date';

describe.each([
  // single months
  ['01.january', 2000, new Date(Date.UTC(2000, 0, 1))],
  ['02.february', 2000, new Date(Date.UTC(2000, 1, 1))],
  ['03.march', 2000, new Date(Date.UTC(2000, 2, 1))],
  ['04.april', 2000, new Date(Date.UTC(2000, 3, 1))],
  ['05.mai', 2000, new Date(Date.UTC(2000, 4, 1))],
  ['06.june', 2000, new Date(Date.UTC(2000, 5, 1))],
  ['07.july', 2000, new Date(Date.UTC(2000, 6, 1))],
  ['08.august', 2000, new Date(Date.UTC(2000, 7, 1))],
  ['09.september', 2000, new Date(Date.UTC(2000, 8, 1))],
  ['10.october', 2000, new Date(Date.UTC(2000, 9, 1))],
  ['11.november', 2000, new Date(Date.UTC(2000, 10, 1))],
  ['12.december', 2000, new Date(Date.UTC(2000, 11, 1))],
  // two years
  ['cycle.2-years', 1999, undefined],
  ['cycle.2-years', 2000, new Date(Date.UTC(2000, 0, 1))],
  ['cycle.2-years', 2001, undefined],
  ['cycle.2-years', 2002, new Date(Date.UTC(2002, 0, 1))],
  ['cycle.2-years.without-valid-from', 2000, undefined],
  // four years
  ['cycle.4-years', 1999, undefined],
  ['cycle.4-years', 2000, new Date(Date.UTC(2000, 0, 1))],
  ['cycle.4-years', 2001, undefined],
  ['cycle.4-years', 2002, undefined],
  ['cycle.4-years', 2003, undefined],
  ['cycle.4-years', 2004, new Date(Date.UTC(2004, 0, 1))],
  ['cycle.4-years.without-valid-from', 2000, undefined],
  // five years
  ['cycle.5-years', 1999, undefined],
  ['cycle.5-years', 2000, new Date(Date.UTC(2000, 0, 1))],
  ['cycle.5-years', 2001, undefined],
  ['cycle.5-years', 2002, undefined],
  ['cycle.5-years', 2003, undefined],
  ['cycle.5-years', 2004, undefined],
  ['cycle.5-years', 2005, new Date(Date.UTC(2005, 0, 1))],
  ['cycle.5-years.without-valid-from', 2000, undefined],
  // six years
  ['cycle.6-years', 1999, undefined],
  ['cycle.6-years', 2000, new Date(Date.UTC(2000, 0, 1))],
  ['cycle.6-years', 2001, undefined],
  ['cycle.6-years', 2002, undefined],
  ['cycle.6-years', 2003, undefined],
  ['cycle.6-years', 2004, undefined],
  ['cycle.6-years', 2005, undefined],
  ['cycle.6-years', 2006, new Date(Date.UTC(2006, 0, 1))],
  ['cycle.5-years.without-valid-from', 2000, undefined],
  // even years
  ['cycle.even-years', 2000, new Date(Date.UTC(2000, 0, 1))],
  ['cycle.even-years', 2001, undefined],
  // every year
  ['cycle.every-year', 2000, new Date(Date.UTC(2000, 0, 1))],
  // odd years
  ['cycle.odd-years', 2000, undefined],
  ['cycle.odd-years', 2001, new Date(Date.UTC(2001, 0, 1))],
  // valid from/to
  ['valid-from', 1999, undefined],
  ['valid-from', 2000, new Date(Date.UTC(2000, 0, 1))],
  ['valid-from', 2001, new Date(Date.UTC(2001, 0, 1))],
  ['valid-to', 1999, new Date(Date.UTC(1999,0, 1))],
  ['valid-to', 2000, new Date(Date.UTC(2000, 0, 1))],
  ['valid-to', 2001, undefined]
])('fixed date calculators', (fileName, year, expected) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${configuration.description} in ${year} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday: IFixedDateHoliday = configuration.holidayCollection[0] as IFixedDateHoliday;

  const calculator = new FixedHolidayCalculator();
  const result = calculator.calculate(holiday, year);
  test(`${configuration.description} in ${year} - calculation`, () => expect(result).toStrictEqual(expected));

});
