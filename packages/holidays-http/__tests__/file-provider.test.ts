import * as nock from 'nock';
import { FileProvider } from '../src/file-provider';

let host: string;
let assetsPath: string;
let scope: nock.Scope;
const answer = { found: true};

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
  scope.get(`/${assetsPath}/configurations.json`).reply(200, answer)
  return provider.loadHierarchies().then((result: string) => {
    expect(result).toBe<string>(JSON.stringify(answer));
    scope.done();
  });
});

test('load-languages', () => {
  const provider = new FileProvider(host, assetsPath);
  scope.get(`/${assetsPath}/languages.json`).reply(200, answer)
  return provider.loadLanguages().then((result: string) => {
    expect(result).toBe<string>(JSON.stringify(answer))
    scope.done();
  });
});

test('load-configurations', () => {
  const provider = new FileProvider(host, assetsPath);
  scope.get(`/${assetsPath}/configurations/de.json`).reply(200, answer)
  return provider.loadConfiguration('de').then((result: string) => {
    expect(result).toBe<string>(JSON.stringify(answer))
    scope.done();
  });
});

test('load-hierachy-translations > en', () => {
  const provider = new FileProvider(host, assetsPath);
  scope.get(`/${assetsPath}/translations/hierarchy.de.json`).reply(200, answer)
  return provider.loadHierarchyTranslations('de').then((result: string) => {
    expect(result).toBe<string>(JSON.stringify(answer))
    scope.done();
  });
});

test('load-hierachy-translations > empty', () => {
  const provider = new FileProvider(host, assetsPath);
  scope.get(`/${assetsPath}/translations/hierarchy.json`).reply(200, answer)
  return provider.loadHierarchyTranslations('').then((result: string) => {
    expect(result).toBe<string>(JSON.stringify(answer))
    scope.done();
  });
});

test('load-hierachy-translations > undefined', () => {
  const provider = new FileProvider(host, assetsPath);
  scope.get(`/${assetsPath}/translations/hierarchy.json`).reply(200, answer)
  return provider.loadHierarchyTranslations().then((result: string) => {
    expect(result).toBe<string>(JSON.stringify(answer))
    scope.done();
  });
});

test('load-holidays-translations > en', () => {
  const provider = new FileProvider(host, assetsPath);
  scope.get(`/${assetsPath}/translations/holiday.en.json`).reply(200, answer)
  return provider.loadHolidayTranslations('en').then((result: string) => {
    expect(result).toBe<string>(JSON.stringify(answer))
    scope.done();
  });
});

test('load-holidays-translations > empty', () => {
  const provider = new FileProvider(host, assetsPath);
  scope.get(`/${assetsPath}/translations/holiday.json`).reply(200, answer)
  return provider.loadHolidayTranslations('').then((result: string) => {
    expect(result).toBe<string>(JSON.stringify(answer))
    scope.done();
  });
});

test('load-holidays-translations > undefined', () => {
  const provider = new FileProvider(host, assetsPath);
  scope.get(`/${assetsPath}/translations/holiday.json`).reply(200, answer)
  return provider.loadHolidayTranslations().then((result: string) => {
    expect(result).toBe<string>(JSON.stringify(answer))
    scope.done();
  });
});

