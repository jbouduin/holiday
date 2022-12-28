/**
 * This test is skipped as it relies on the availability of the github pages deployment
 * It has only been created to make sure that the wrapper really works
 */
import { IHierarchy, IHoliday } from '@jbouduin/holidays-lib/src';
import { HolidaysHttp } from '../src/holidays-http';

describe('Test the http wrapper', () => {
  test('retrieve the supported languages', () => {
    const holidays = new HolidaysHttp('https://jbouduin.github.io/holiday-site/', 'assets/holidays');
    return holidays
      .getSupportedLanguages()
      .then((result: Array<string>) => expect(result).toHaveLength(5));
  });

  test('retrieve the hierarchies', () => {
    const holidays = new HolidaysHttp('https://jbouduin.github.io/holiday-site/', 'assets/holidays');
    return holidays.getHierarchyTree().then((result: Array<IHierarchy>) => {
      expect(result.length).toBeGreaterThan(0);
    });
  });

  test('retrieve the holidays in 2022 for a munich in bavaria in germany', () => {
    const holidays = new HolidaysHttp('https://jbouduin.github.io/holiday-site/', 'assets/holidays');
    return holidays.getHolidays('de/by/mu', 2022, false).then((result: Array<IHoliday>) => {
      expect(result.length).toBeGreaterThan(0);
    });

  });

  test('retrieve the holidays in 2022 for bavaria in germany, including all local holidays', () => {
    const holidays = new HolidaysHttp('https://jbouduin.github.io/holiday-site/', 'assets/holidays');
    return holidays.getHolidays('de/be', 2022, true).then((result: Array<IHoliday>) => {
      expect(result.length).toBeGreaterThan(0);
    });
  })

  test('retrieve the holidays in 2022 for germany, leaving out all regional and local holidays', () => {
    const holidays = new HolidaysHttp('https://jbouduin.github.io/holiday-site/', 'assets/holidays');
    return holidays.getHolidays('de', 2022, false).then((result: Array<IHoliday>) => {
      expect(result.length).toBeGreaterThan(0);
    });
  });
});