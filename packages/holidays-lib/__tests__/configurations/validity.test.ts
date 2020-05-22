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
  [ 'ec', 'Ecuador' ],
  [ 'ee', 'Estonia' ],
  [ 'et', 'Ethiopia' ],
  [ 'gr', 'Greece'],
  [ 'hr', 'Croatia' ],
  [ 'hu', 'Hungary' ],
  [ 'kz', 'Kazakhstan' ],
  [ 'li', 'Liechtenstein' ],
  [ 'lt', 'Lithuania' ],
  [ 'lv', 'Latvia' ],
  [ 'me', 'Montenegro' ],
  [ 'mk', 'Macedonia' ],
  [ 'mt', 'Malta' ],
  [ 'nsye-euronext', 'nsye-euronext']
])('Configuration %s (%s)', (iso, description) => {
  const configuration = Configuration.loadByHierarchy(iso);
  test('hierarchy correct', () => expect(configuration.hierarchy).toBe(iso));
  test('hierarchy correct', () => expect(configuration.description).toBe(description));
  const validation = configuration.validate();
  test('configuration valid', () => expect(validation.length).toBe(0));
});
