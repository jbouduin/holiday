import { Greeter } from '../src/index';

test('My Greeter', () => {
  expect(Greeter('Johan')).toBe('Hello Johan');
});
