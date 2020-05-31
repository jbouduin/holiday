import { ErrorKey } from '../../src/configuration';
import { Loader } from '../loader';

const dataRoot = './configurations/data/configuration';
const location = 'root';

describe.each([
  // TODO ['a.missing.file', ErrorKey.FILE_NOT_FOUND, location],
  // TODO ['directory', ErrorKey.COULD_NOT_READ_FILE, location],
  ['invalid.collection.empty', ErrorKey.HOLIDAY_COLLECTION_EMPTY, '/invalid.collection.empty'],
  ['invalid.collection.missing', ErrorKey.HOLIDAY_COLLECTION_MISSING, '/invalid.collection.missing'],
  ['invalid.content', ErrorKey.INVALID_FILE_CONTENTS, location],
  ['invalid.description.empty', ErrorKey.DESCRIPTION_NOT_SPECIFIED, '/invalid.description.empty'],
  ['invalid.description.missing', ErrorKey.DESCRIPTION_NOT_SPECIFIED, '/invalid.description.missing'],
  ['invalid.hierarchy.empty', ErrorKey.HIERARCHY_NOT_SPECIFIED, location],
  ['invalid.hierarchy.missing', ErrorKey.HIERARCHY_NOT_SPECIFIED, location],
])('Configuration > Invalid configurations > %s', (fileName: string, key: ErrorKey, location: string) => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/${fileName}.json`);
  test('number of errors', () => expect(configuration.errors.length).toBe(1));
  const error = configuration.errors[0];
  test('Error key', () => expect(error.key).toBe(key));
  test('Location', () => expect(error.location).toBe(location));
});

describe('Configuration > Valid configuration', () => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/valid.configuration.json`);
  test('no errors', () => expect(configuration.errors.length).toBe(0));
  test('hierarchy', () => expect(configuration.hierarchy).toBe('valid.configuration'));
  test('description', () => expect(configuration.description).toBe('valid.configuration'));
  test('holiday created', () => expect(configuration.holidays.length).toBe(1));
});

describe('Configuration > Only an invalid', () => {
  const configuration = Loader.loadConfiguration(`${dataRoot}/invalid.collection.no-valid-holidays.json`);
  test('no holiday created', () => expect(configuration.holidays.length).toBe(0));
  test('two errors', () => expect(configuration.errors.length).toBe(2));
  const noValidHolidaysError = configuration.errors.filter(error => error.key === ErrorKey.NO_VALID_HOLIDAYS_IN_COLLECTION);
  test('NO_VALID_HOLIDAYS_IN_COLLECTION error exists', () => expect(noValidHolidaysError.length).toBe(1));
  test('NO_VALID_HOLIDAYS_IN_COLLECTION error location', () => expect(noValidHolidaysError[0].location).toBe('/invalid.no-valid-holidays'));
  const invalidHolidayType = configuration.errors.filter(error => error.key === ErrorKey.HOLIDAY_TYPE_INVALID);
  test('invalidHolidayType error exists', () => expect(invalidHolidayType.length).toBe(1));
  test('invalidHolidayType error location', () => expect(invalidHolidayType[0].location).toBe('/invalid.no-valid-holidays/1'));
});

// TODO describe.each([
//   [''],
//   ['/xx']
// ])('Configuration > Invalid hierarchy > %s', (hierarchy: string) => {
//   const configuration = new Holidays().loadByHierarchy(hierarchy);
//   test('number of errors', () => expect(configuration.errors.length).toBe(1));
//   const error = configuration.errors[0];
//   test('Error key', () => expect(error.key).toBe(ErrorKey.HIERARCHY_INVALID));
//   test('Location', () => expect(error.location).toBe(location));
// });
