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
  [ 'ie', 'Ireland' ],
  [ 'kz', 'Kazakhstan' ],
  [ 'jp', 'Japan' ],
  [ 'li', 'Liechtenstein' ],
  [ 'lt', 'Lithuania' ],
  [ 'lv', 'Latvia' ],
  [ 'me', 'Montenegro' ],
  [ 'mk', 'Macedonia' ],
  [ 'mt', 'Malta' ],
  [ 'nl', 'The Netherlands' ],
  [ 'no', 'Norway' ],
  [ 'nsye-euronext', 'nsye-euronext'],
  [ 'pa', 'Panama' ],
  [ 'pe', 'Peru' ],
  [ 'pl', 'Poland' ],
  [ 'py', 'Paraguay' ],
  [ 'ro', 'Romania' ],
  [ 'rs', 'Serbia' ],
  [ 'si', 'Slovenia' ],
  [ 'sk', 'Slovakia' ],
  [ 'target', 'Trans-European Automated Real-time Gross settlement Express Transfer system closing dates'],
  [ 've', 'Venezuela' ],
  [ 'ua', 'Ukraine']
])('Configuration %s (%s)', (iso, description) => {
  const configuration = Configuration.loadByHierarchy(iso);
  test('hierarchy correct', () => expect(configuration.hierarchy).toBe(iso));
  test('hierarchy correct', () => expect(configuration.description).toBe(description));
  const validation = configuration.validate();
  test('configuration valid', () => expect(validation.length).toBe(0));
});
