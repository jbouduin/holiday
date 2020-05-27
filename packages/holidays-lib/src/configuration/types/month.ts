export enum Month {
  // Do not change the order: the value is used in calculations
  JANUARY = 0,
  FEBRUARY,
  MARCH,
  APRIL,
  MAY,
  JUNE,
  JULY,
  AUGUST,
  SEPTEMBER,
  OCTOBER,
  NOVEMBER,
  DECEMBER
}

export type MonthKeyStrings = keyof typeof Month;
