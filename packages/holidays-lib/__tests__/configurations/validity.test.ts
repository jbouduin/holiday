import { Configuration } from '../../src/configuration/configuration';

// these tests currenlty only test the validity of the json files, not the contents
test('Configuration Ethiopia', () => {
  const loader = jest.fn(fileName => Configuration.loadByHierarchy(fileName));
  loader('et');
  expect(loader).toHaveReturned();
});

test('Configuration nsye.euronext', () => {
  const loader = jest.fn(fileName => Configuration.loadByHierarchy(fileName));
  loader('nsye-euronext');
  expect(loader).toHaveReturned();
});
