import { FileProvider } from './file-provider';
import { HierarchyCalculator } from '../../src/calculators';

test('invalid JSON', async () => {
  const calculator = new HierarchyCalculator('en', new FileProvider('./data/invalid'))
  return calculator.getSupportedLanguages().catch( e => expect(e).toBeInstanceOf(SyntaxError));
});


test('valid JSON', async () => {
  const calculator = new HierarchyCalculator('en', new FileProvider('./data/valid'))
  return calculator.getSupportedLanguages().then( languages => expect(languages.length).toBe(5));
});
