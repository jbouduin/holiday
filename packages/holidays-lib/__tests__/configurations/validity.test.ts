import { ConfigurationFactory } from '../../src/configuration';

// these tests only test the conformity of the json files
describe.each([
  [ 'al', 'Albania' ],
  [ 'ar', 'Argentina' ],
  [ 'be', 'Belgium' ],
  [ 'bg', 'Bulgaria' ],
  [ 'bo', 'Bolivia' ],
  [ 'by', 'Belarus' ],
  [ 'cl', 'Chile' ],
  [ 'co', 'Colombia' ],
  [ 'cr', 'Costa Rica' ],
  [ 'cz', 'Czech Republic' ],
  [ 'dk', 'Denmark' ],
  [ 'ec', 'Ecuador' ],
  [ 'ee', 'Estonia' ],
  [ 'et', 'Ethiopia' ],
  [ 'fi', 'Finland'],
  [ 'gr', 'Greece'],
  [ 'hr', 'Croatia' ],
  [ 'hu', 'Hungary' ],
  [ 'ie', 'Ireland' ],
  [ 'is', 'Iceland' ],
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
  [ 'nyse', 'New York Stock Exchange' ],
  [ 'pa', 'Panama' ],
  [ 'pe', 'Peru' ],
  [ 'pl', 'Poland' ],
  [ 'py', 'Paraguay' ],
  [ 'ro', 'Romania' ],
  [ 'rs', 'Serbia' ],
  [ 'se', 'Sweden' ],
  [ 'si', 'Slovenia' ],
  [ 'sk', 'Slovakia' ],
  [ 'target', 'Trans-European Automated Real-time Gross settlement Express Transfer system closing dates'],
  [ 'uy', 'Uruguay' ],
  [ 've', 'Venezuela' ],
  [ 'ua', 'Ukraine']
])('Configuration %s (%s)', (iso, description) => {
  const configuration = new ConfigurationFactory().loadByHierarchy(iso);
  test('hierarchy correct', () => expect(configuration.hierarchy).toBe(iso));
  test('description correct', () => expect(configuration.description).toBe(description));
  test(`number of errors`, () => expect(configuration.errors.length).toBe(0));
  if (iso === 'ar') { configuration.errors.forEach(e => console.log(e, e.args));}
});
