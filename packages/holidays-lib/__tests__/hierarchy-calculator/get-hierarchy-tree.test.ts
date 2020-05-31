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
    expect(tree[0].description).toBe('Hierarchy A1');
    expect(tree[1].code).toBe('A2');
    expect(tree[1].description).toBe('Hierarchy A2');
    expect(tree[1].children.length).toBe(3);
    expect(tree[1].children[0].code).toBe('B1');
    expect(tree[1].children[0].description).toBe('Hierarchy B1');
    expect(tree[1].children[2].children.length).toBe(3);
    expect(tree[1].children[2].children[0].code).toBe('C1');
    expect(tree[1].children[2].children[0].description).toBe('Hierarchy C1');
  });
});
