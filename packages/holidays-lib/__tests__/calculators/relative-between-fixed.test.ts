import * as path from 'path';

import { RelativeHolidayCalculator } from '../../src/calculators';
import { IRelativeHoliday, IRelationWeekday, IBetweenFixedDates } from '../../src/configuration';
import { ConfigurationFactory } from '../../src/configuration';

const dataRoot = './data/relative-between-fixed';

describe.each([
  [ '00.sunday', 2020, new Date(Date.UTC(2020, 0, 19))],
  [ '01.monday', 2020, new Date(Date.UTC(2020, 0, 20))],
  [ '02.tuesday', 2020, new Date(Date.UTC(2020, 0, 21))],
  [ '03.wednesday', 2020, new Date(Date.UTC(2020, 0, 22))],
  [ '04.thursday', 2020, new Date(Date.UTC(2020, 0, 23))],
  [ '05.friday', 2020, new Date(Date.UTC(2020, 0, 24))],
  [ '06.saturday', 2020, new Date(Date.UTC(2020, 0, 25))]
])('relative between > first day of range is sunday> %s', (fileName, year, expected) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday: IRelativeHoliday<IRelationWeekday, IBetweenFixedDates> =
    configuration.holidays[0] as IRelativeHoliday<IRelationWeekday, IBetweenFixedDates>;
  const calculator = new RelativeHolidayCalculator();
  const result = calculator.calculate(holiday, year);
  if (result) {
    test('calucation', () => expect(result).toStrictEqual(expected));
  }
});

describe.each([
  [ '00.sunday', 2015, new Date(Date.UTC(2015, 0, 25))],
  [ '01.monday', 2015, new Date(Date.UTC(2015, 0, 19))],
  [ '02.tuesday', 2015, new Date(Date.UTC(2015, 0, 20))],
  [ '03.wednesday', 2015, new Date(Date.UTC(2015, 0, 21))],
  [ '04.thursday', 2015, new Date(Date.UTC(2015, 0, 22))],
  [ '05.friday', 2015, new Date(Date.UTC(2015, 0, 23))],
  [ '06.saturday', 2015, new Date(Date.UTC(2015, 0, 24))]
])('relative between > last day of range is sunday> %s', (fileName, year, expected) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday: IRelativeHoliday<IRelationWeekday, IBetweenFixedDates> =
    configuration.holidays[0] as IRelativeHoliday<IRelationWeekday, IBetweenFixedDates>;
  const calculator = new RelativeHolidayCalculator();
  const result = calculator.calculate(holiday, year);
  if (result) {
    test('calucation', () => expect(result).toStrictEqual(expected));
  }
});
