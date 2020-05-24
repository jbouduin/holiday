export enum Which {
  // Do not change the order: the value is used in calculations
  FIRST = 0,
  SECOND,
  THIRD,
  FOURTH,
  LAST
}

export type WhichKeyStrings = keyof typeof Which;
