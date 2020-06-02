import { FileProvider } from './file-provider';
import { HierarchyCalculator } from '../../src/calculators';

test('translate Christian holidays', async () => {
  const calculator = new HierarchyCalculator('en', new FileProvider('./data/valid'));
  return calculator.getHolidays('trc', 2020, false).then( holidays => {
    expect(holidays.length).toBe(3);
    expect(holidays[0].name).toBe('english');
    expect(holidays[1].name).toBe('fallback');
    expect(holidays[2].name).toBe('CHRISTIAN.WHIT_SUNDAY');
  });
});

// TODO: if calculation is implemented
// test('translate Ethiopian-Orthodox holidays', async () => {
//   const calculator = new HierarchyCalculator('en', new FileProvider('./data/valid'));
//   return calculator.getHolidays('tre', 2020, false).then( holidays => {
//     expect(holidays.length).toBe(3);
//   });
// });

test('translate fixed dates holidays', async () => {
  const calculator = new HierarchyCalculator('en', new FileProvider('./data/valid'));
  return calculator.getHolidays('trfd', 2020, false).then( holidays => {
    expect(holidays.length).toBe(3);
    expect(holidays[0].name).toBe('english');
    expect(holidays[1].name).toBe('fallback');
    expect(holidays[2].name).toBe('FD_NO_TRANSLATION');
  });
});

test('translate fixed weekday holidays', async () => {
  const calculator = new HierarchyCalculator('en', new FileProvider('./data/valid'));
  return calculator.getHolidays('trfw', 2020, false).then( holidays => {
    expect(holidays.length).toBe(3);
    expect(holidays[0].name).toBe('english');
    expect(holidays[1].name).toBe('fallback');
    expect(holidays[2].name).toBe('FW_NO_TRANSLATION');
  });
});

// TODO if calculation is implemented
// test('translate Islamic holidays', async () => {
//   const calculator = new HierarchyCalculator('en', new FileProvider('./data/valid'));
//   return calculator.getHolidays('trc', 2020, false).then( holidays => {
//     expect(holidays.length).toBe(3);
//   });
// });

test('translate relative between fixed holidays', async () => {
  const calculator = new HierarchyCalculator('en', new FileProvider('./data/valid'));
  return calculator.getHolidays('trrbf', 2020, false).then( holidays => {
    expect(holidays.length).toBe(3);
    expect(holidays[0].name).toBe('english');
    expect(holidays[1].name).toBe('fallback');
    expect(holidays[2].name).toBe('RBF_NO_TRANSLATION');
  });
});

test('translate relative to date holidays', async () => {
  const calculator = new HierarchyCalculator('en', new FileProvider('./data/valid'));
  return calculator.getHolidays('trrd', 2020, false).then( holidays => {
    expect(holidays.length).toBe(3);
    expect(holidays[0].name).toBe('english');
    expect(holidays[1].name).toBe('fallback');
    expect(holidays[2].name).toBe('RD_NO_TRANSLATION');
  });
});

test('translate relative to weekday holidays', async () => {
  const calculator = new HierarchyCalculator('en', new FileProvider('./data/valid'));
  return calculator.getHolidays('trrw', 2020, false).then( holidays => {
    expect(holidays.length).toBe(3);
    expect(holidays[0].name).toBe('english');
    expect(holidays[1].name).toBe('fallback');
    expect(holidays[2].name).toBe('RW_NO_TRANSLATION');
  });
});
