import * as path from 'path';

import { Configuration } from '../../src/configuration';

const dataRoot = './data/configuration';
test('invalid configuration', () => {
  const fileName = path.join(__dirname, `${dataRoot}/invalid-collection.json`);
  const validation = Configuration.loadByFileName(fileName).validate();
  expect(validation.length).toBe(2);
});

test('invalid holiday-type', () => {
  const fileName = path.join(__dirname, `${dataRoot}/invalid-holiday-type.json`);
  expect( () => { Configuration.loadByFileName(fileName); }).toThrow();
});

test('empty collection', () => {
  const fileName = path.join(__dirname, `${dataRoot}/empty-collection.json`);
  expect( () => { Configuration.loadByFileName(fileName); }).toThrow();
});

test('no collection', () => {
  const fileName = path.join(__dirname, `${dataRoot}/no-collection.json`);
  expect( () => { Configuration.loadByFileName(fileName); }).toThrow();
});
