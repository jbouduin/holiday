import { Configuration } from '../../src/configuration/configuration';

// these tests only test the validity of the json files, not the contents
describe.each([
  [ 'bg', 'Bulgaria' ],
  [ 'bo', 'Bolivia' ],
  [ 'by', 'Belarus' ],
  [ 'et', 'Ethiopia' ],
  [ 'gr', 'Greece'],
  [ 'nsye-euronext', 'nsye-euronext']
])('Configuration %s (%s)', (iso, description) => {
  const configuration = Configuration.loadByHierarchy(iso);
  test('hierarchy correct', () => expect(configuration.hierarchy).toBe(iso));
  test('hierarchy correct', () => expect(configuration.description).toBe(description));
  const validation = configuration.validate();
  test('configuration valid', () => expect(validation.length).toBe(0));
});
