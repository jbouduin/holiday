import { FileProvider } from './file-provider';
import { HierarchyCalculator } from '../../src/calculators';

test('invalid JSON', async () => {
  const calculator = new HierarchyCalculator('en', new FileProvider('./data/invalid'))
  return calculator.getHierarchyTree().catch( e => expect(e).toBeInstanceOf(SyntaxError));
});


test('valid JSON', async () => {
  const calculator = new HierarchyCalculator('en', new FileProvider('./data/valid'))
  return calculator.getHierarchyTree().then( tree => {
    expect(tree.length).toBe(2);
    expect(tree[0].code).toBe('A1');
    expect(tree[0].fullPath).toBe('A1');
    expect(tree[0].description).toBe('en A1');
    expect(tree[1].code).toBe('A2');
    expect(tree[1].fullPath).toBe('A2');
    expect(tree[1].description).toBe('en A2');
    expect(tree[1].children.length).toBe(3);
    expect(tree[1].children[0].code).toBe('B1');
    expect(tree[1].children[0].fullPath).toBe('A2/B1');
    expect(tree[1].children[0].description).toBe('fb A2/B1');
    expect(tree[1].children[1].code).toBe('B2');
    expect(tree[1].children[1].fullPath).toBe('A2/B2');
    expect(tree[1].children[1].description).toBe('en A2/B2');
    expect(tree[1].children[2].children.length).toBe(3);
    expect(tree[1].children[2].children[0].code).toBe('C1');
    expect(tree[1].children[2].children[0].fullPath).toBe('A2/B3/C1');
    expect(tree[1].children[2].children[0].description).toBe('en A2/B3/C1');
    expect(tree[1].children[2].children[2].code).toBe('C3');
    expect(tree[1].children[2].children[2].fullPath).toBe('A2/B3/C3');
    expect(tree[1].children[2].children[2].description).toBe('Hierarchy C3');
  });
});
