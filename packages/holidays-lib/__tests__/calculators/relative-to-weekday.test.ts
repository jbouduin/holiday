import * as path from 'path';

import { RelativeHolidayCalculator } from '../../src/calculators';
import { IFix, IRelation, IFixedWeekday, IRelationWhichWeekdayWhen, IRelativeHoliday } from '../../src/configuration';
import { ConfigurationFactory } from '../../src/configuration';

const dataRoot = './data/relative-to-weekday';

describe.each([
  [ 'test', 2017, new Date(Date.UTC(2017, 0, 1))],
])('test > %s', (fileName, year, expected) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidays.length).toBe(1));
  // const holiday: IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday> =
  //   configuration.holidays[0] as IRelativeHoliday<IRelationWhichWeekdayWhen, IFixedWeekday>;
  const holiday: IRelativeHoliday<IRelation, IFix> =
    configuration.holidays[0] as IRelativeHoliday<IRelation, IFix>;
  const calculator = new RelativeHolidayCalculator();
  const result = calculator.calculate(holiday, year);
  // console.log(result);
  // if (result) {
  //   test('move detected', () => expect(result.getTime() === expected.getTime()).toBeFalsy());
  // }
});
