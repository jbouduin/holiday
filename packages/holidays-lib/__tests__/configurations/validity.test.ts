import { Configuration } from '../../src/configuration/configuration';

// these tests only test the validity of the json files, not the contents
test('Configuration nsye.euronext', () => {
  const loader = jest.fn(fileName => Configuration.loadByHierarchy(fileName));
  loader('nsye-euronext');
  expect(loader).toHaveReturned();
});
