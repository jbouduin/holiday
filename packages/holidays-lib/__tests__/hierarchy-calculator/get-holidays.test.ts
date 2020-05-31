import { FileProvider } from './file-provider';
import { HierarchyCalculator } from '../../src/calculators';
import { ChristianHolidayType } from '../../src/configuration/types';

test('invalid JSON', async () => {
  const calculator = new HierarchyCalculator('en', new FileProvider('./data/invalid'));
  return calculator.getHolidays('a1', 2020, false).catch( e => expect(e).toBeInstanceOf(SyntaxError));
});

test('calculate a configuration with no holidays', async () => {
  const calculator = new HierarchyCalculator('en', new FileProvider('./data/valid'));
  return calculator.getHolidays('00', 2020, false).then( holidays => {
    expect(holidays.length).toBe(0);
  });
});

test('calculate a fixed date (NEW_YEAR)', async () => {
  const calculator = new HierarchyCalculator('en', new FileProvider('./data/valid'));
  return calculator.getHolidays('01', 2020, false).then( holidays => {
    expect(holidays.length).toBe(1);
    expect(holidays[0].key).toBe('NEW_YEAR');
    expect(holidays[0].date).toStrictEqual(new Date(Date.UTC(2020, 0, 1)));
  });
});

test('calculate a christian holiday (EASTER)', async () => {
  const calculator = new HierarchyCalculator('en', new FileProvider('./data/valid'));
  return calculator.getHolidays('02', 2022, false).then( holidays => {
    expect(holidays.length).toBe(1);
    expect(ChristianHolidayType[holidays[0].key]).toBe(ChristianHolidayType[ChristianHolidayType.EASTER]);
    expect(holidays[0].date).toStrictEqual(new Date(Date.UTC(2022, 3, 24)));
  });
});

test('calculate a Fixed weekday (THANKSGIVING)', async () => {
  const calculator = new HierarchyCalculator('en', new FileProvider('./data/valid'));
  return calculator.getHolidays('03', 2020, false).then( holidays => {
    expect(holidays.length).toBe(1);
    expect(holidays[0].key).toBe('THANKSGIVING');
    expect(holidays[0].date).toStrictEqual(new Date(Date.UTC(2020, 10, 26)));
  });
});

test('calculate a Relative between fixed (HUSBANDS_DAY)', async () => {
  const calculator = new HierarchyCalculator('en', new FileProvider('./data/valid'));
  return calculator.getHolidays('04', 2020, false).then( holidays => {
    expect(holidays.length).toBe(1);
    expect(holidays[0].key).toBe('HUSBANDS_DAY');
    expect(holidays[0].date).toStrictEqual(new Date(Date.UTC(2020, 0, 24)));
  });
});

test('calculate a Relative to date (VICTORIA_DAY)', async () => {
  const calculator = new HierarchyCalculator('en', new FileProvider('./data/valid'));
  return calculator.getHolidays('05', 2020, false).then( holidays => {
    expect(holidays.length).toBe(1);
    expect(holidays[0].key).toBe('VICTORIA_DAY');
    expect(holidays[0].date).toStrictEqual(new Date(Date.UTC(2020, 4, 18)));
  });
});

test('calculate a Relative to weekday (ELECTION)', async () => {
  const calculator = new HierarchyCalculator('en', new FileProvider('./data/valid'));
  return calculator.getHolidays('06', 2020, false).then( holidays => {
    expect(holidays.length).toBe(1);
    expect(holidays[0].key).toBe('ELECTION');
    expect(holidays[0].date).toStrictEqual(new Date(Date.UTC(2020, 10, 3)));
  });
});

test('calculate a move from requested to previous year', async () => {
  const calculator = new HierarchyCalculator('en', new FileProvider('./data/valid'));
  return calculator.getHolidays('07', 2020, false).then( holidays => {
    expect(holidays.length).toBe(0);
  });
});

test('calculate a move from requested to previous and from next to requested year', async () => {
  const calculator = new HierarchyCalculator('en', new FileProvider('./data/valid'));
  return calculator.getHolidays('07', 2019, false).then( holidays => {
    expect(holidays.length).toBe(1);
    expect(holidays[0].key).toBe('NEW_YEAR');
    expect(holidays[0].date).toStrictEqual(new Date(Date.UTC(2019, 11, 30)));
  });
});

test('calculate a move from requested to next year', async () => {
  const calculator = new HierarchyCalculator('en', new FileProvider('./data/valid'));
  return calculator.getHolidays('08', 2020, false).then( holidays => {
    expect(holidays.length).toBe(0);
  });
});

test('calculate a move from requested to next and from previous to requested year', async () => {
  const calculator = new HierarchyCalculator('en', new FileProvider('./data/valid'));
  return calculator.getHolidays('08', 2021, false).then( holidays => {
    expect(holidays.length).toBe(1);
    expect(holidays[0].key).toBe('NEW_YEARS_EVE');
    expect(holidays[0].date).toStrictEqual(new Date(Date.UTC(2021, 0, 4)));
  });
});

test('calculate an Islamic holiday (ID_AL_FITR)', async () => {
  const calculator = new HierarchyCalculator('en', new FileProvider('./data/valid'));
  return calculator.getHolidays('09', 2020, false).then( holidays => {
    expect(holidays.length).toBe(0);
    // expect(IslamicHolidayType[holidays[0].key]).toBe(IslamicHolidayType[IslamicHolidayType.ID_AL_FITR]);
    // expect(holidays[0].date).toStrictEqual(new Date(Date.UTC(2022, 3, 24)));
  });
});

test('calculate an Ethiopian-Orthodox holiday (MESKEL)', async () => {
  const calculator = new HierarchyCalculator('en', new FileProvider('./data/valid'));
  return calculator.getHolidays('10', 2020, false).then( holidays => {
    expect(holidays.length).toBe(0);
    // expect(EthiopianOrthodoxHolidayType[holidays[0].key]).toBe(EthiopianOrthodoxHolidayType[EthiopianOrthodoxHolidayType.MESKEL]);
    // expect(holidays[0].date).toStrictEqual(new Date(Date.UTC(2022, 3, 24)));
  });
});
