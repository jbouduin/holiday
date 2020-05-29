import * as path from 'path';

import { FixedHolidayCalculator } from '../../src/calculators';
import { IFixedDateHoliday } from '../../src/configuration';
import { ConfigurationFactory } from '../../src/configuration';

const dataRoot = './data/move';

describe.each([
  ['detect-move.00.sunday', 2017, new Date(Date.UTC(2017, 0, 1))],
  ['detect-move.01.monday', 2018, new Date(Date.UTC(2018, 0, 1))],
  ['detect-move.02.tuesday', 2019, new Date(Date.UTC(2019, 0, 1))],
  ['detect-move.03.wednesday', 2020, new Date(Date.UTC(2020, 0, 1))],
  ['detect-move.04.thursday', 2009, new Date(Date.UTC(2009, 0, 1))],
  ['detect-move.05.friday', 2010, new Date(Date.UTC(2010, 0, 1))],
  ['detect-move.06.saturday', 2011, new Date(Date.UTC(2011, 0, 1))],
  ['detect-move.07.weekend', 2011, new Date(Date.UTC(2011, 0, 1))],
  ['detect-move.07.weekend', 2017, new Date(Date.UTC(2017, 0, 1))], // sunday
])('detect move > %s', (fileName, year, expected) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday: IFixedDateHoliday = configuration.holidays[0] as IFixedDateHoliday;
  const calculator = new FixedHolidayCalculator();
  const result = calculator.calculate(holiday, year);
  if (result) {
    test('move detected', () => expect(result.getTime() === expected.getTime()).toBeFalsy());
  }
});

describe.each([
  ['move-to-next.00.sunday', 2018, new Date(Date.UTC(2018, 0, 7))],
  ['move-to-next.01.monday', 2011, new Date(Date.UTC(2011, 0, 3))],
  ['move-to-next.02.tuesday', 2011, new Date(Date.UTC(2011, 0, 4))],
  ['move-to-next.03.wednesday', 2011, new Date(Date.UTC(2011, 0, 5))],
  ['move-to-next.04.thursday', 2011, new Date(Date.UTC(2011, 0, 6))],
  ['move-to-next.05.friday', 2011, new Date(Date.UTC(2011, 0, 7))],
  ['move-to-next.06.saturday', 2018, new Date(Date.UTC(2018, 0, 6))]
])('to next > %s', (fileName, year, expected) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday: IFixedDateHoliday = configuration.holidays[0] as IFixedDateHoliday;
  const calculator = new FixedHolidayCalculator();
  const result = calculator.calculate(holiday, year);
  test('move', () => expect(result).toStrictEqual(expected));
});

describe.each([
  ['move-to-previous.00.sunday', 2018, new Date(Date.UTC(2017, 11, 31))],
  ['move-to-previous.01.monday', 2011, new Date(Date.UTC(2010, 11, 27))],
  ['move-to-previous.02.tuesday', 2011, new Date(Date.UTC(2010, 11, 28))],
  ['move-to-previous.03.wednesday', 2011, new Date(Date.UTC(2010, 11, 29))],
  ['move-to-previous.04.thursday', 2011, new Date(Date.UTC(2010, 11, 30))],
  ['move-to-previous.05.friday', 2011, new Date(Date.UTC(2010, 11, 31))],
  ['move-to-previous.06.saturday', 2018, new Date(Date.UTC(2017, 11, 30))]
])('to previous > %s', (fileName, year, expected) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday: IFixedDateHoliday = configuration.holidays[0] as IFixedDateHoliday;
  const calculator = new FixedHolidayCalculator();
  const result = calculator.calculate(holiday, year);
  test('move', () => expect(result).toStrictEqual(expected));
});

describe.each([
  ['move.chain', 2020, new Date(Date.UTC(2020, 0, 3))]
])('move chain > %s', (fileName, year, expected) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday: IFixedDateHoliday = configuration.holidays[0] as IFixedDateHoliday;
  const calculator = new FixedHolidayCalculator();
  const result = calculator.calculate(holiday, year);
  test('chain', () => expect(result).toStrictEqual(expected));

});

describe.each([
  ['no-move.endless-loop', 2020, new Date(Date.UTC(2020, 0, 1))],
  ['no-move.none-defined', 2020, new Date(Date.UTC(2020, 0, 1))],
])('no move > %s', (fileName, year, expected) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday: IFixedDateHoliday = configuration.holidays[0] as IFixedDateHoliday;
  const calculator = new FixedHolidayCalculator();
  const result = calculator.calculate(holiday, year);
  test('no move', () => expect(result).toStrictEqual(expected));

});
