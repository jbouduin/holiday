import * as path from 'path';

import { IConfiguration } from '../../src/configuration';
import { ConfigurationFactory } from '../../src/configuration';
import { ErrorKeys } from '../../src/configuration';

const dataRoot = './data/configuration';
const location = 'root';

describe.each([
  ['a.missing.file', ErrorKeys.FILE_NOT_FOUND, location],
  ['directory', ErrorKeys.COULD_NOT_READ_FILE, location],
  ['invalid.collection.empty', ErrorKeys.HOLIDAY_COLLECTION_EMPTY, '/invalid.collection.empty'],
  ['invalid.collection.missing', ErrorKeys.HOLIDAY_COLLECTION_MISSING, '/invalid.collection.missing'],
  ['invalid.content', ErrorKeys.INVALID_FILE_CONTENTS, location],
  ['invalid.description.empty', ErrorKeys.DESCRIPTION_NOT_SPECIFIED, '/invalid.description.empty'],
  ['invalid.description.missing', ErrorKeys.DESCRIPTION_NOT_SPECIFIED, '/invalid.description.missing'],
  ['invalid.hierarchy.empty', ErrorKeys.HIERARCHY_NOT_SPECIFIED, location],
  ['invalid.hierarchy.missing', ErrorKeys.HIERARCHY_NOT_SPECIFIED, location],
])('Configuration > Invalid configurations', (fileName: string, key: ErrorKeys, location: string) => {
  const file = path.join(__dirname, `${dataRoot}/${fileName}.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test(`${fileName} > number of errors`, () => expect(configuration.errors.length).toBe(1));
  const error = configuration.errors[0];
  test(`${fileName} > Error key`, () => expect(error.key).toBe(key));
  test(`${fileName} > Location`, () => expect(error.location).toBe(location));
});

describe('Configuration > Valid configuration', () => {
  const file = path.join(__dirname, `${dataRoot}/valid.configuration.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test('no errors', () => expect(configuration.errors.length).toBe(0));
  test('hierarchy', () => expect(configuration.hierarchy).toBe('valid.configuration'));
  test('description', () => expect(configuration.description).toBe('valid.configuration'));
  test('holiday created', () => expect(configuration.holidayCollection.length).toBe(1));
});

describe('Configuration > Only an invalid', () => {
  const file = path.join(__dirname, `${dataRoot}/invalid.collection.no-valid-holidays.json`);
  const configuration = new ConfigurationFactory().loadByFileName(file);
  test('no holiday created', () => expect(configuration.holidayCollection.length).toBe(0));
  test('two errors', () => expect(configuration.errors.length).toBe(2));
  const noValidHolidaysError = configuration.errors.filter(error => error.key === ErrorKeys.NO_VALID_HOLIDAYS_IN_COLLECTION);
  test('NO_VALID_HOLIDAYS_IN_COLLECTION error exists', () => expect(noValidHolidaysError.length).toBe(1));
  test('NO_VALID_HOLIDAYS_IN_COLLECTION error location', () => expect(noValidHolidaysError[0].location).toBe('/invalid.no-valid-holidays'));
  const invalidHolidayType = configuration.errors.filter(error => error.key === ErrorKeys.HOLIDAY_TYPE_INVALID);
  test('invalidHolidayType error exists', () => expect(invalidHolidayType.length).toBe(1));
  test('invalidHolidayType error location', () => expect(invalidHolidayType[0].location).toBe('/invalid.no-valid-holidays/1'));
});

describe.each([
  [''],
  ['/xx']
])('Configuration > Invalid hierarchy', (hierarchy: string) => {
  const configuration = new ConfigurationFactory().loadByHierarchy(hierarchy);
  test(`${hierarchy} > number of errors`, () => expect(configuration.errors.length).toBe(1));
  const error = configuration.errors[0];
  test(`${hierarchy} > Error key`, () => expect(error.key).toBe(ErrorKeys.HIERARCHY_INVALID));
  test(`${hierarchy} > Location`, () => expect(error.location).toBe(location));
});
