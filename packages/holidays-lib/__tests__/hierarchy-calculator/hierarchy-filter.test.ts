import { HierarchyFilter } from '../../src/calculators/helpers';
import { Loader } from '../loader';
import { IBaseHoliday } from '../../src/configuration';

describe('l1 > not deep', () => {
  const configuration = Loader.loadConfiguration('./hierarchy-calculator/data/valid/configurations/l1.json');
  const result = new HierarchyFilter().filterConfigurationByHierarchy(configuration, 'l1', false);
  test('number filtered', () => expect(result.length).toBe(1));
  test('key l1', () => expect(result[0].key).toBe('l1'));
});

describe('l1 > deep', () => {
  const configuration = Loader.loadConfiguration('./hierarchy-calculator/data/valid/configurations/l1.json');
  const result = new HierarchyFilter().filterConfigurationByHierarchy(configuration, 'l1', true);
  test('number filtered', () => expect(result.length).toBe(9));
  test('key l1', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1').length).toBe(1));
  test('key l1.1', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1.1').length).toBe(1));
  test('key l1.2', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1.2').length).toBe(1));
  test('key l1.2.1', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1.2.1').length).toBe(1));
  test('key l1.2.2', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1.2.2').length).toBe(1));
  test('key l1.3', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1.3').length).toBe(1));
  test('key l1.3.1', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1.3.1').length).toBe(1));
  test('key l1.3.2', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1.3.2').length).toBe(1));
});

describe('Level 1.1 > not deep', () => {
  const configuration = Loader.loadConfiguration('./hierarchy-calculator/data/valid/configurations/l1.json');
  const result = new HierarchyFilter().filterConfigurationByHierarchy(configuration, 'l1/l1.1', false);
  test('number filtered', () => expect(result.length).toBe(2));
  test('key l1', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1').length).toBe(1));
  test('key l1.1', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1.1').length).toBe(1));
});

describe('Level 1.1 > deep', () => {
  const configuration = Loader.loadConfiguration('./hierarchy-calculator/data/valid/configurations/l1.json');
  const result = new HierarchyFilter().filterConfigurationByHierarchy(configuration, 'l1/l1.1', true);
  test('number filtered', () => expect(result.length).toBe(2));
  test('key l1', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1').length).toBe(1));
  test('key l1.1', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1.1').length).toBe(1));
});

describe('Level 1.2 > not deep', () => {
  const configuration = Loader.loadConfiguration('./hierarchy-calculator/data/valid/configurations/l1.json');
  const result = new HierarchyFilter().filterConfigurationByHierarchy(configuration, 'l1/l1.2', false);
  test('number filtered', () => expect(result.length).toBe(2));
  test('key l1', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1').length).toBe(1));
  test('key l1.2', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1.2').length).toBe(1));
});

describe('Level 1.2 > deep', () => {
  const configuration = Loader.loadConfiguration('./hierarchy-calculator/data/valid/configurations/l1.json');
  const result = new HierarchyFilter().filterConfigurationByHierarchy(configuration, 'l1/l1.2', true);
  test('number filtered', () => expect(result.length).toBe(4));
  test('key l1', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1').length).toBe(1));
  test('key l1.2', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1.2').length).toBe(1));
  test('key l1.2.1', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1.2.1').length).toBe(1));
  test('key l1.2.2', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1.2.2').length).toBe(1));
});

describe('Level 1.2.1 > not deep', () => {
  const configuration = Loader.loadConfiguration('./hierarchy-calculator/data/valid/configurations/l1.json');
  const result = new HierarchyFilter().filterConfigurationByHierarchy(configuration, 'l1/l1.2/l1.2.1', false);
  test('number filtered', () => expect(result.length).toBe(3));
  test('key l1', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1').length).toBe(1));
  test('key l1.2', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1.2').length).toBe(1));
  test('key l1.2.1', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1.2.1').length).toBe(1));
});

describe('Level 1.2.1 > deep', () => {
  const configuration = Loader.loadConfiguration('./hierarchy-calculator/data/valid/configurations/l1.json');
  const result = new HierarchyFilter().filterConfigurationByHierarchy(configuration, 'l1/l1.2/l1.2.1', true);
  test('number filtered', () => expect(result.length).toBe(3));
  test('key l1', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1').length).toBe(1));
  test('key l1.2', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1.2').length).toBe(1));
  test('key l1.2.1', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1.2.1').length).toBe(1));
});


describe('Level 1.2.8 > deep', () => {
  const configuration = Loader.loadConfiguration('./hierarchy-calculator/data/valid/configurations/l1.json');
  const result = new HierarchyFilter().filterConfigurationByHierarchy(configuration, 'l1/l1.2/l1.2.8', true);
  test('number filtered', () => expect(result.length).toBe(2));
  test('key l1', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1').length).toBe(1));
  test('key l1.2', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1.2').length).toBe(1));
  // test('key l1.2.1', () => expect(result.filter( (holiday: IBaseHoliday<any>) => holiday.key === 'l1.2.1').length).toBe(1));
});
