import { Configuration } from '../../src/configuration/configuration';

// these tests only test the validity of the json files, not the contents
describe.each([
  [ 'be', 'Belgium' ],
  [ 'bg', 'Bulgaria' ],
  [ 'bo', 'Bolivia' ],
  [ 'by', 'Belarus' ],
  [ 'cl', 'Chile' ],
  [ 'cr', 'Costa Rica' ],
  [ 'cz', 'Czech Republic' ],
  [ 'dk', 'Denmark' ],
  [ 'hr', 'Croatia' ],
  [ 'ec', 'Ecuador' ],
  [ 'ee', 'Estonia' ],
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
