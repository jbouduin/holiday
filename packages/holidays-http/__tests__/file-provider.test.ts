import * as nock from 'nock';
import { FileProvider } from '../src/file-provider';

let host: string;
let assetsPath: string;
let scope: nock.Scope;

//#region setup/teardown ------------------------------------------------------
beforeAll(() => {
  nock.cleanAll();
  host = 'http://test.holiday-lib.org';
  assetsPath = 'assets';
  scope = nock(host);
});

afterAll(() => nock.restore());
//#endregion

test('load-hierarchies', () => {
  const provider = new FileProvider(host, assetsPath);
  scope.get(`/${assetsPath}/configurations.json`).reply(200, 'found')
  return provider.loadHierarchies().then((result: string) => {
    console.log(result);
    expect(result).toBe<string>('found');
    scope.done();
  });
});

test('load-languages', () => {
  const provider = new FileProvider(host, assetsPath);
  scope.get(`/${assetsPath}/languages.json`).reply(200, 'found')
  return provider.loadLanguages().then((result: string) => {
    console.log(result);
    expect(result).toBe<string>('found');
    scope.done();
  });
});

// test('load-hierarchies > file not found', async () => {
//   const provider = new FileProvider(host, assetsPath);
//   return provider.loadHierarchies().catch(e => expect(e.code).toMatch('ENOENT'));
// });

test('load-configurations', () => {
  const provider = new FileProvider(host, assetsPath);
  scope.get(`/${assetsPath}/configurations/de.json`).reply(200, 'found')
  return provider.loadConfiguration('de').then((result: string) => {
    console.log(result);
    expect(result).toBe<string>('found');
    scope.done();
  });
});

// test.only('load-configurations > file not found > non existing hierarchy', async () => {
//   const provider = new FileProvider(host, assetsPath);
//   scope.get(`/${assetsPath}/configurations/12.json`).reply(404)
//   return provider.loadConfiguration('12').then((result: string) => {
//     console.log(result);

//     scope.done();
//   });
// });

test('load-hierachy-translations > en', () => {
  const provider = new FileProvider(host, assetsPath);
  scope.get(`/${assetsPath}/translations/hierarchy.de.json`).reply(200, 'found')
  return provider.loadHierarchyTranslations('de').then((result: string) => {
    console.log(result);
    expect(result).toBe<string>('found');
    scope.done();
  });
});

test('load-hierachy-translations > empty', () => {
  const provider = new FileProvider(host, assetsPath);
  scope.get(`/${assetsPath}/translations/hierarchy.json`).reply(200, 'found')
  return provider.loadHierarchyTranslations('').then((result: string) => {
    console.log(result);
    expect(result).toBe<string>('found');
    scope.done();
  });
});

test('load-hierachy-translations > undefined', () => {
  const provider = new FileProvider(host, assetsPath);
  scope.get(`/${assetsPath}/translations/hierarchy.json`).reply(200, 'found')
  return provider.loadHierarchyTranslations().then((result: string) => {
    console.log(result);
    expect(result).toBe<string>('found');
    scope.done();
  });
});

test('load-holidays-translations > en', () => {
  const provider = new FileProvider(host, assetsPath);
  scope.get(`/${assetsPath}/translations/holiday.en.json`).reply(200, 'found')
  return provider.loadHolidayTranslations('en').then((result: string) => {
    console.log(result);
    expect(result).toBe<string>('found');
    scope.done();
  });
});

test('load-holidays-translations > empty', () => {
  const provider = new FileProvider(host, assetsPath);
  scope.get(`/${assetsPath}/translations/holiday.json`).reply(200, 'found')
  return provider.loadHolidayTranslations('').then((result: string) => {
    console.log(result);
    expect(result).toBe<string>('found');
    scope.done();
  });
});

test('load-holidays-translations > undefined', () => {
  const provider = new FileProvider(host, assetsPath);
  scope.get(`/${assetsPath}/translations/holiday.json`).reply(200, 'found')
  return provider.loadHolidayTranslations().then((result: string) => {
    console.log(result);
    expect(result).toBe<string>('found');
    scope.done();
  });
});

