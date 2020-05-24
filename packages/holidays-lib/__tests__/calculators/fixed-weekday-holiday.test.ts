import * as path from 'path';
import { FixedWeekdayCalculator } from '../../src/calculators';
import { Configuration, IFixedWeekdayHoliday } from '../../src/configuration';

const dataRoot = './data/fixed-weekday';

// all tests are executed for Februari as this is a special month
describe.each([
  ['10.first.sunday', 2015, new Date(Date.UTC(2015, 1, 1))],
  ['11.first.monday', 2016, new Date(Date.UTC(2016, 1, 1))],
  ['12.first.tuesday', 2011, new Date(Date.UTC(2011, 1, 1))],
  ['13.first.wednesday', 2017, new Date(Date.UTC(2017, 1, 1))],
  ['14.first.thursday', 2018, new Date(Date.UTC(2018, 1, 1))],
  ['15.first.friday', 2019, new Date(Date.UTC(2019, 1, 1))],
  ['16.first.saturday', 2020, new Date(Date.UTC(2020, 1, 1))]
])('fixed weekday > first is also first day of the month', (fileName: string, year: number, expected: Date) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} in ${year} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday: IFixedWeekdayHoliday = configuration.holidayCollection[0] as IFixedWeekdayHoliday;
  const calculator = new FixedWeekdayCalculator();
  const result = calculator.calculate(holiday, year);
  test(`${fileName} in ${year} - calculation`, () => expect(result).toStrictEqual(expected));
});

describe.each([
  ['10.first.sunday', 2020, new Date(Date.UTC(2020, 1, 2))],
  ['11.first.monday', 2020, new Date(Date.UTC(2020, 1, 3))],
  ['12.first.tuesday', 2020, new Date(Date.UTC(2020, 1, 4))],
  ['13.first.wednesday', 2020, new Date(Date.UTC(2020, 1, 5))],
  ['14.first.thursday', 2020, new Date(Date.UTC(2020, 1, 6))],
  ['15.first.friday', 2020, new Date(Date.UTC(2020, 1, 7))],
  ['16.first.saturday', 2019, new Date(Date.UTC(2019, 1, 2))]
])('fixed weekday > first is not first day of the month', (fileName: string, year: number, expected: Date) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} in ${year} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday: IFixedWeekdayHoliday = configuration.holidayCollection[0] as IFixedWeekdayHoliday;
  const calculator = new FixedWeekdayCalculator();
  const result = calculator.calculate(holiday, year);
  test(`${fileName} in ${year} - calculation`, () => expect(result).toStrictEqual(expected));
});

describe.each([
  ['20.second.sunday', 2020, new Date(Date.UTC(2020, 1, 9))],
  ['21.second.monday', 2020, new Date(Date.UTC(2020, 1, 10))],
  ['22.second.tuesday', 2020, new Date(Date.UTC(2020, 1, 11))],
  ['23.second.wednesday', 2020, new Date(Date.UTC(2020, 1, 12))],
  ['24.second.thursday', 2020, new Date(Date.UTC(2020, 1, 13))],
  ['25.second.friday', 2020, new Date(Date.UTC(2020, 1, 14))],
  ['26.second.saturday', 2020, new Date(Date.UTC(2020, 1, 8))]
])('fixed weekday > second', (fileName: string, year: number, expected: Date | undefined) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} in ${year} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday: IFixedWeekdayHoliday = configuration.holidayCollection[0] as IFixedWeekdayHoliday;
  const calculator = new FixedWeekdayCalculator();
  const result = calculator.calculate(holiday, year);
  test(`${fileName} in ${year} - calculation`, () => expect(result).toStrictEqual(expected));
});


describe.each([
  ['30.third.sunday', 2020, new Date(Date.UTC(2020, 1, 16))],
  ['31.third.monday', 2020, new Date(Date.UTC(2020, 1, 17))],
  ['32.third.tuesday', 2020, new Date(Date.UTC(2020, 1, 18))],
  ['33.third.wednesday', 2020, new Date(Date.UTC(2020, 1, 19))],
  ['34.third.thursday', 2020, new Date(Date.UTC(2020, 1, 20))],
  ['35.third.friday', 2020, new Date(Date.UTC(2020, 1, 21))],
  ['36.third.saturday', 2020, new Date(Date.UTC(2020, 1, 15))]
])('fixed weekday > third', (fileName: string, year: number, expected: Date) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} in ${year} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday: IFixedWeekdayHoliday = configuration.holidayCollection[0] as IFixedWeekdayHoliday;
  const calculator = new FixedWeekdayCalculator();
  const result = calculator.calculate(holiday, year);
  test(`${fileName} in ${year} - calculation`, () => expect(result).toStrictEqual(expected));
});

describe.each([
  ['40.fourth.sunday', 2020, new Date(Date.UTC(2020, 1, 23))],
  ['41.fourth.monday', 2020, new Date(Date.UTC(2020, 1, 24))],
  ['42.fourth.tuesday', 2020, new Date(Date.UTC(2020, 1, 25))],
  ['43.fourth.wednesday', 2020, new Date(Date.UTC(2020, 1, 26))],
  ['44.fourth.thursday', 2020, new Date(Date.UTC(2020, 1, 27))],
  ['45.fourth.friday', 2020, new Date(Date.UTC(2020, 1, 28))],
  ['46.fourth.saturday', 2020, new Date(Date.UTC(2020, 1, 22))],
  // special february case in a non leap year: fourth x is also last day of the month
  ['44.fourth.thursday', 2019, new Date(Date.UTC(2019, 1, 28))]
])('fixed weekday > third', (fileName: string, year: number, expected: Date | undefined) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} in ${year} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday: IFixedWeekdayHoliday = configuration.holidayCollection[0] as IFixedWeekdayHoliday;
  const calculator = new FixedWeekdayCalculator();
  const result = calculator.calculate(holiday, year);
  test(`${fileName} in ${year} - calculation`, () => expect(result).toStrictEqual(expected));
});

describe.each([
  ['50.last.sunday', 2010, new Date(Date.UTC(2010, 1, 28))],
  ['51.last.monday', 2016, new Date(Date.UTC(2016, 1, 29))],
  ['52.last.tuesday', 2017, new Date(Date.UTC(2017, 1, 28))],
  ['53.last.wednesday', 2018, new Date(Date.UTC(2018, 1, 28))],
  ['54.last.thursday', 2019, new Date(Date.UTC(2019, 1, 28))],
  ['55.last.friday', 2014, new Date(Date.UTC(2014, 1, 28))],
  ['56.last.saturday', 2020, new Date(Date.UTC(2020, 1, 29))]
])('fixed weekday > last is last day of the month', (fileName: string, year: number, expected: Date) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} in ${year} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday: IFixedWeekdayHoliday = configuration.holidayCollection[0] as IFixedWeekdayHoliday;
  const calculator = new FixedWeekdayCalculator();
  const result = calculator.calculate(holiday, year);
  test(`${fileName} in ${year} - calculation`, () => expect(result).toStrictEqual(expected));
});

describe.each([
  ['50.last.sunday', 2020, new Date(Date.UTC(2020, 1, 23))],
  ['51.last.monday', 2020, new Date(Date.UTC(2020, 1, 24))],
  ['52.last.tuesday', 2020, new Date(Date.UTC(2020, 1, 25))],
  ['53.last.wednesday', 2020, new Date(Date.UTC(2020, 1, 26))],
  ['54.last.thursday', 2020, new Date(Date.UTC(2020, 1, 27))],
  ['55.last.friday', 2020, new Date(Date.UTC(2020, 1, 28))],
  ['56.last.saturday', 2020, new Date(Date.UTC(2020, 1, 29))]
])('fixed weekday > last is not last day of the month', (fileName: string, year: number, expected: Date) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} in ${year} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday: IFixedWeekdayHoliday = configuration.holidayCollection[0] as IFixedWeekdayHoliday;
  const calculator = new FixedWeekdayCalculator();
  const result = calculator.calculate(holiday, year);
  test(`${fileName} in ${year} - calculation`, () => expect(result).toStrictEqual(expected));
});

describe.each([
  ['99.does-not-occur', 2020, undefined]
])('fixed weekday > other', (fileName: string, year: number, expected: Date | undefined) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = Configuration.loadByFileName(file);
  test(`${fileName} in ${year} - collection length`, () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday: IFixedWeekdayHoliday = configuration.holidayCollection[0] as IFixedWeekdayHoliday;
  const calculator = new FixedWeekdayCalculator();
  const result = calculator.calculate(holiday, year);
  test(`${fileName} in ${year} - calculation`, () => expect(result).toStrictEqual(expected));
});
