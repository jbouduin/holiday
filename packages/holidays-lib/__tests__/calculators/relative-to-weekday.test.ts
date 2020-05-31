import { RelativeHolidayCalculator } from '../../src/calculators';
import { IFixedWeekday, IRelationWhichWeekdayWhen, IRelativeHoliday } from '../../src/configuration';
import { Loader } from '../loader';

const dataRoot = './calculators/data/relative-to-weekday';

describe.each([
  ['first.00.sunday.after', 2020, new Date(Date.UTC(2020, 0, 19))],
  ['first.01.monday.after', 2020, new Date(Date.UTC(2020, 0, 20))],
  ['first.02.tuesday.after', 2020, new Date(Date.UTC(2020, 0, 21))],
  ['first.03.wednesday.after', 2020, new Date(Date.UTC(2020, 0, 22))],
  ['first.04.thursday.after', 2020, new Date(Date.UTC(2020, 0, 23))],
  ['first.05.friday.after', 2020, new Date(Date.UTC(2020, 0, 24))],
  ['first.06.saturday.after', 2020, new Date(Date.UTC(2020, 0, 25))]
])('first after > %s', (fileName: string, year: number, expected: Date) => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/${fileName}.json`);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday: IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday> =
    configuration.holidays[0] as IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday>;
  const calculator = new RelativeHolidayCalculator();
  const result = calculator.calculate(holiday, year);
  test('calculation', () => expect(result).toStrictEqual(expected));
});

describe.each([
  ['first.00.sunday.before', 2020, new Date(Date.UTC(2020, 0, 19))],
  ['first.01.monday.before', 2020, new Date(Date.UTC(2020, 0, 13))],
  ['first.02.tuesday.before', 2020, new Date(Date.UTC(2020, 0, 14))],
  ['first.03.wednesday.before', 2020, new Date(Date.UTC(2020, 0, 15))],
  ['first.04.thursday.before', 2020, new Date(Date.UTC(2020, 0, 16))],
  ['first.05.friday.before', 2020, new Date(Date.UTC(2020, 0, 17))],
  ['first.06.saturday.before', 2020, new Date(Date.UTC(2020, 0, 18))]
])('first before > %s', (fileName: string, year: number, expected: Date) => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/${fileName}.json`);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday: IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday> =
    configuration.holidays[0] as IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday>;
  const calculator = new RelativeHolidayCalculator();
  const result = calculator.calculate(holiday, year);
  test('calculation', () => expect(result).toStrictEqual(expected));
});

describe.each([
  ['02.second.00.sunday.after', 2020, new Date(Date.UTC(2020, 0, 26))],
  ['02.second.00.sunday.before', 2020, new Date(Date.UTC(2020, 0, 12))],
  ['03.third.00.sunday.after', 2020, new Date(Date.UTC(2020, 1, 2))],
  ['03.third.00.sunday.before', 2020, new Date(Date.UTC(2020, 0, 5))],
  ['04.fourth.00.sunday.after', 2020, new Date(Date.UTC(2020, 1, 9))],
  ['04.fourth.00.sunday.before', 2020, new Date(Date.UTC(2019, 11, 29))],
])('x-th before after > %s', (fileName: string, year: number, expected: Date) => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/${fileName}.json`);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday: IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday> =
    configuration.holidays[0] as IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday>;
  const calculator = new RelativeHolidayCalculator();
  const result = calculator.calculate(holiday, year);
  test('calculation', () => expect(result).toStrictEqual(expected));
});

describe.each([
  ['02.second.01.monday.after', 2020, new Date(Date.UTC(2020, 0, 27))],
  ['02.second.01.monday.before', 2020, new Date(Date.UTC(2020, 0, 6))],
  ['03.third.01.monday.after', 2020, new Date(Date.UTC(2020, 1, 3))],
  ['03.third.01.monday.before', 2020, new Date(Date.UTC(2019, 11, 30))],
  ['04.fourth.01.monday.after', 2020, new Date(Date.UTC(2020, 1, 10))],
  ['04.fourth.01.monday.before', 2020, new Date(Date.UTC(2019, 11, 23))],
])('x-th before after > %s', (fileName: string, year: number, expected: Date) => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/${fileName}.json`);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday: IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday> =
    configuration.holidays[0] as IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday>;
  const calculator = new RelativeHolidayCalculator();
  const result = calculator.calculate(holiday, year);
  test('calculation', () => expect(result).toStrictEqual(expected));
});
