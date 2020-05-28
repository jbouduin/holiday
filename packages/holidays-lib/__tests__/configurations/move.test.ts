import * as path from 'path';
import { ConfigurationFactory } from '../../src/configuration';
import { ErrorKey } from '../../src/configuration';
import { IBaseHoliday } from '../../src/configuration';
import { Condition } from '../../src/configuration';
import { MoveTo } from '../../src/configuration';
import { Weekday } from '../../src/configuration';

const dataRoot = './data/move';

describe.each([
  ['condition.00.is-sunday', Condition.IS_SUNDAY],
  ['condition.01.is-monday', Condition.IS_MONDAY],
  ['condition.02.is-tuesday', Condition.IS_TUESDAY],
  ['condition.03.is-wednesday', Condition.IS_WEDNESDAY],
  ['condition.04.is-thursday', Condition.IS_THURSDAY],
  ['condition.05.is-friday', Condition.IS_FRIDAY],
  ['condition.06.is-saturday', Condition.IS_SATURDAY],
  ['condition.07.is-weekend', Condition.IS_WEEKEND]
])('move > condition > %s', (fileName: string, expected: Condition) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday: IBaseHoliday<any> = configuration.holidayCollection[0] as IBaseHoliday<any>;
  test('move created', () => expect(holiday.moves.length).toBe(1));
  test('condition', () => expect(Condition[holiday.moves[0].condition]).toBe(Condition[expected]));
});

describe.each([
  ['invalid.condition.empty', ErrorKey.MOVE_CONDITION_MISSING],
  ['invalid.condition.missing', ErrorKey.MOVE_CONDITION_MISSING],
  ['invalid.condition.value', ErrorKey.MOVE_CONDITION_INVALID],
  ['invalid.conditions.duplicate', ErrorKey.MOVE_DUPLICATE_CONDITIONS],
  ['invalid.conditions.weekend-saturday', ErrorKey.MOVE_DUPLICATE_CONDITIONS],
  ['invalid.conditions.weekend-sunday', ErrorKey.MOVE_DUPLICATE_CONDITIONS],
  ['invalid.move-to.empty', ErrorKey.MOVE_MOVE_TO_MISSING],
  ['invalid.move-to.missing', ErrorKey.MOVE_MOVE_TO_MISSING],
  ['invalid.move-to.value', ErrorKey.MOVE_MOVE_TO_INVALID],
  ['invalid.move.empty', ErrorKey.MOVE_EMPTY],
  ['invalid.weekday.empty', ErrorKey.MOVE_WEEKDAY_MISSING],
  ['invalid.weekday.missing', ErrorKey.MOVE_WEEKDAY_MISSING],
  ['invalid.weekday.value', ErrorKey.MOVE_WEEKDAY_INVALID]
])('moves > invalid configurations > %s', (fileName: string, key: ErrorKey) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test('number of holidays', () => expect(configuration.holidayCollection.length).toBe(0));
  test('number of errors', () => expect(configuration.errors.length).toBe(2));
  const noValidHolidaysError = configuration.errors.filter(error => error.key === ErrorKey.NO_VALID_HOLIDAYS_IN_COLLECTION);
  test('NO_VALID_HOLIDAYS_IN_COLLECTION error exists', () => expect(noValidHolidaysError.length).toBe(1));
  const expectedError = configuration.errors.filter(error => error.key === key);
  test('expected error exists', () => expect(expectedError.length).toBe(1));
});

describe.each([
  ['move-to.next', MoveTo.NEXT],
  ['move-to.previous', MoveTo.PREVIOUS]
])('move > moveTo > %s', (fileName: string, expected: MoveTo) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday: IBaseHoliday<any> = configuration.holidayCollection[0] as IBaseHoliday<any>;
  test('move created', () => expect(holiday.moves.length).toBe(1));
  test('condition', () => expect(MoveTo[holiday.moves[0].moveTo]).toBe(MoveTo[expected]));
});

describe.each([
  ['moves.empty', 0],
  ['moves.multiple', 2],
  ['moves.not-defined', 0]
])('moves > %s', (fileName: string, expected: number) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test('number of errors', () => expect(configuration.errors.length).toBe(0));
  test('number of holidays', () => expect(configuration.holidayCollection.length).toBe(1));
  const holiday: IBaseHoliday<any> = configuration.holidayCollection[0] as IBaseHoliday<any>;
  test('number of moves', () => expect(holiday.moves.length).toBe(expected));
});
