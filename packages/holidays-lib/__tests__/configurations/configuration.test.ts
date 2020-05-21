import * as path from 'path';

import { Configuration } from '../../src/configuration/configuration';

const dataRoot = './data';
test('invalid configuration', () => {
  const fileName = path.join(__dirname, `${dataRoot}/invalid.json`);
  const validation = Configuration.loadByFileName(fileName).validate();
  expect(validation.length).toBe(2);
});
