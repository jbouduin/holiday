import { Greeter } from './index';

test('My Greeter', () => {
  expect(Greeter('Johan')).toBe('Hello Johan');
});
