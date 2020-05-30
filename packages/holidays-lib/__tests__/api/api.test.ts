import { Holidays, IHierarchy } from '../../src/api';

describe('get hierarchies', () => {
  const hierarchies: Array<IHierarchy> = new Holidays().getHierarchyTree();
  test('returned somethiing', () => expect(hierarchies).toBeDefined());
  test('found hierarchies', () => expect(hierarchies.length > 0).toBeTruthy());

})
