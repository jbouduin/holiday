import { FileProvider } from '../src/file-provider';

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
