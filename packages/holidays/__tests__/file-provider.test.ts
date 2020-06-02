import * as path from 'path';

import { FileProvider } from '../src/file-provider';

test('load-hierarchies > absolute path', () => {
  const provider = new FileProvider(path.join(__dirname, '../../holidays-lib/src/assets'));
  return expect(provider.loadHierarchies()).toBeDefined();
});

test('load-hierarchies', () => {
  const provider = new FileProvider('../../holidays-lib/src/assets');
  return expect(provider.loadHierarchies()).toBeDefined();
});

test('load-hierarchies > file not found', async () => {
  const provider = new FileProvider('../../holidays-lib/src/asset');
  return provider.loadHierarchies().catch( e => expect(e.code).toMatch('ENOENT'));
});

test('load-hierarchies > is a directory', async () => {
  const provider = new FileProvider('../__tests__/data');
  return provider.loadHierarchies().catch( e => expect(e.code).toMatch('EISDIR'));
});

test('load-configurations', () => {
  const provider = new FileProvider('../../holidays-lib/src/assets');
  return expect(provider.loadConfiguration('de')).toBeDefined();
});

test('load-configurations > file not found > wrong directory', async () => {
  const provider = new FileProvider('../../holidays-lib/src/asset');
  return provider.loadConfiguration('de').catch( e => expect(e.code).toMatch('ENOENT'));
});

test('load-configurations > file not found > non existing hierarchy', async () => {
  const provider = new FileProvider('../../holidays-lib/src/asset');
  return provider.loadConfiguration('12').catch( e => expect(e.code).toMatch('ENOENT'));
});

test('load-configurations > file not found > is a directory', async () => {
  const provider = new FileProvider('../__tests__/data');
  return provider.loadConfiguration('de').catch( e => expect(e.code).toMatch('EISDIR'));
});

test('load-languages', () => {
  const provider = new FileProvider('../../holidays-lib/src/assets');
  return expect(provider.loadLanguages()).toBeDefined();
});

test('load-languages > file not found > wrong directory', async () => {
  const provider = new FileProvider('../../holidays-lib/src/asset');
  return provider.loadLanguages().catch( e => expect(e.code).toMatch('ENOENT'));
});

test('load-languages > file not found > is a directory', async () => {
  const provider = new FileProvider('../__tests__/data');
  return provider.loadLanguages().catch( e => expect(e.code).toMatch('EISDIR'));
});

test('load-hierachy-translations > en', () => {
  const provider = new FileProvider('../../holidays-lib/src/assets');
  return expect(provider.loadHierarchyTranslations('en')).toBeDefined();
});

test('load-hierachy-translations > empty', () => {
  const provider = new FileProvider('../../holidays-lib/src/assets');
  return expect(provider.loadHierarchyTranslations('')).toBeDefined();
});

test('load-hierachy-translations > undefined', () => {
  const provider = new FileProvider('../../holidays-lib/src/assets');
  return expect(provider.loadHierarchyTranslations()).toBeDefined();
});

test('load-holidays-translations > file not found > wrong directory', async () => {
  const provider = new FileProvider('../../holidays-lib/src/asset');
  return provider.loadHierarchyTranslations('en').catch( e => expect(e.code).toMatch('ENOENT'));
});

test('load-holidays-translations > en', () => {
  const provider = new FileProvider('../../holidays-lib/src/assets');
  return expect(provider.loadHolidayTranslations('en')).toBeDefined();
});

test('load-holidays-translations > empty', () => {
  const provider = new FileProvider('../../holidays-lib/src/assets');
  return expect(provider.loadHolidayTranslations('')).toBeDefined();
});

test('load-holidays-translations > undefined', () => {
  const provider = new FileProvider('../../holidays-lib/src/assets');
  return expect(provider.loadHolidayTranslations()).toBeDefined();
});

test('load-holidays-translations > file not found > wrong directory', async () => {
  const provider = new FileProvider('../../holidays-lib/src/asset');
  return provider.loadHolidayTranslations('en').catch( e => expect(e.code).toMatch('ENOENT'));
});
