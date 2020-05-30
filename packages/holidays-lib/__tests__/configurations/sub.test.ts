import * as path from 'path';

import { Holidays } from '../../src/api';
import { ErrorKey } from '../../src/configuration';
import { IFixedDateHoliday } from '../../src/configuration';
import { Month } from '../../src/configuration';

const dataRoot = './data/sub';

describe('valid with 3 levels', () => {
  const file = path.join(__dirname, `${dataRoot}/valid.json`);
  const configuration = new Holidays().loadByFileName(file);

  test('parent > hierarchy', () => expect(configuration.hierarchy).toBe('parent'));
  test('parent > description', () => expect(configuration.description).toBe('parent'));
  test('parent > number of errors', () => expect(configuration.errors.length).toBe(0));
  test('parent > number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday: IFixedDateHoliday = configuration.holidays[0] as IFixedDateHoliday;
  test('parent holiday > month', () => expect(Month[holiday.month]).toBe(Month[Month.JANUARY]));
  test('parent holiday > value', () => expect(holiday.day).toBe(1));
  test('parent > number of subConfigurations', () => expect(configuration.subConfigurations.length).toBe(2));

  const child1 = configuration.subConfigurations[0];
  test('child1 > hierarchy', () => expect(child1.hierarchy).toBe('child-1'));
  test('child1 > description', () => expect(child1.description).toBe('child 1'));
  test('child1 > number of errors', () => expect(child1.errors.length).toBe(0));
  test('child1 > number of holidays', () => expect(child1.holidays.length).toBe(1));
  const holiday1 = child1.holidays[0] as IFixedDateHoliday;
  test('child1 holiday > month', () => expect(Month[holiday1.month]).toBe(Month[Month.FEBRUARY]));
  test('child1 holiday > value', () => expect(holiday1.day).toBe(2));
  test('child1 > number of subConfigurations', () => expect(child1.subConfigurations.length).toBe(1));

  const child2 = configuration.subConfigurations[1];
  test('child2 > hierarchy', () => expect(child2.hierarchy).toBe('child-2'));
  test('child2 > description', () => expect(child2.description).toBe('child 2'));
  test('child2 > number of errors', () => expect(child2.errors.length).toBe(0));
  test('child2 > number of holidays', () => expect(child2.holidays.length).toBe(1));
  const holiday2 = child2.holidays[0] as IFixedDateHoliday;
  test('child2 holiday > month', () => expect(Month[holiday2.month]).toBe(Month[Month.FEBRUARY]));
  test('child2 holiday > value', () => expect(holiday2.day).toBe(2));
  test('child2 > number of subConfigurations', () => expect(child2.subConfigurations.length).toBe(0));

  const grandChild = child1.subConfigurations[0];
  test('grandChild > hierarchy', () => expect(grandChild.hierarchy).toBe('grand-child-1'));
  test('grandChild > description', () => expect(grandChild.description).toBe('grand-child 1'));
  test('grandChild > number of errors', () => expect(grandChild.errors.length).toBe(0));
  test('grandChild > number of holidays', () => expect(grandChild.holidays.length).toBe(1));
  const holiday3 = grandChild.holidays[0] as IFixedDateHoliday;
  test('grandChild holiday > month', () => expect(Month[holiday3.month]).toBe(Month[Month.MARCH]));
  test('grandChild holiday > value', () => expect(holiday3.day).toBe(3));
  test('grandChild > number of subConfigurations', () => expect(grandChild.subConfigurations.length).toBe(0));
})


describe('errors on all 3 levels', () => {
  const file = path.join(__dirname, `${dataRoot}/with-errors.json`);
  const configuration = new Holidays().loadByFileName(file);

  test('parent > hierarchy', () => expect(configuration.hierarchy).toBe('parent'));
  test('parent > description', () => expect(configuration.description).toBe('parent'));
  test('parent > number of errors', () => expect(configuration.errors.length).toBe(1));
  test('parent > number of holidays', () => expect(configuration.holidays.length).toBe(1));
  const holiday: IFixedDateHoliday = configuration.holidays[0] as IFixedDateHoliday;
  test('parent holiday > month', () => expect(Month[holiday.month]).toBe(Month[Month.JANUARY]));
  test('parent holiday > value', () => expect(holiday.day).toBe(1));
  test('parent > number of subConfigurations', () => expect(configuration.subConfigurations.length).toBe(2));
  const error = configuration.errors[0];
  test('parent error > key', () => expect(error.key).toBe(ErrorKey.FIXED_DATE_MONTH_INVALID));

  const child1 = configuration.subConfigurations[0];
  test('child1 > hierarchy', () => expect(child1.hierarchy).toBe('child-1'));
  test('child1 > description', () => expect(child1.description).toBe('child 1'));
  test('child1 > number of errors', () => expect(child1.errors.length).toBe(1));
  test('child1 > number of holidays', () => expect(child1.holidays.length).toBe(1));
  const holiday1 = child1.holidays[0] as IFixedDateHoliday;
  test('child1 holiday > month', () => expect(Month[holiday1.month]).toBe(Month[Month.FEBRUARY]));
  test('child1 holiday > value', () => expect(holiday1.day).toBe(2));
  test('child1 > number of subConfigurations', () => expect(child1.subConfigurations.length).toBe(1));
  const error1 = child1.errors[0];
  test('child1 error > key', () => expect(error1.key).toBe(ErrorKey.FIXED_DATE_DAY_OUT_OF_RANGE));

  const child2 = configuration.subConfigurations[1];
  test('child2 > hierarchy', () => expect(child2.hierarchy).toBe('child-2'));
  test('child2 > description', () => expect(child2.description).toBe('child 2'));
  test('child2 > number of errors', () => expect(child2.errors.length).toBe(1));
  test('child2 > number of holidays', () => expect(child2.holidays.length).toBe(1));
  const holiday2 = child2.holidays[0] as IFixedDateHoliday;
  test('child2 holiday > month', () => expect(Month[holiday2.month]).toBe(Month[Month.FEBRUARY]));
  test('child2 holiday > value', () => expect(holiday2.day).toBe(2));
  test('child2 > number of subConfigurations', () => expect(child2.subConfigurations.length).toBe(0));
  const error2 = child2.errors[0];
  test('child2 error > key', () => expect(error2.key).toBe(ErrorKey.CHRISTIAN_TYPE_MISSING));

  const grandChild = child1.subConfigurations[0];
  test('grandChild > hierarchy', () => expect(grandChild.hierarchy).toBe('grand-child-1'));
  test('grandChild > description', () => expect(grandChild.description).toBe('grand-child 1'));
  test('grandChild > number of errors', () => expect(grandChild.errors.length).toBe(1));
  test('grandChild > number of holidays', () => expect(grandChild.holidays.length).toBe(1));
  const holiday3 = grandChild.holidays[0] as IFixedDateHoliday;
  test('grandChild holiday > month', () => expect(Month[holiday3.month]).toBe(Month[Month.MARCH]));
  test('grandChild holiday > value', () => expect(holiday3.day).toBe(3));
  test('grandChild > number of subConfigurations', () => expect(grandChild.subConfigurations.length).toBe(0));
  const error3 = grandChild.errors[0];
  test('grandChild error > key', () => expect(error3.key).toBe(ErrorKey.KEY_MISSING));
})
