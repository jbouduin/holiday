export enum Which {
  FIRST,
  SECOND,
  THIRD,
  FOURTH,
  LAST
}

export type WhichKeyStrings = keyof typeof Which;
