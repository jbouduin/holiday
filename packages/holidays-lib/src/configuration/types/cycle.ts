export enum Cycle {
  TWO_YEARS,
  FOUR_YEARS,
  FIVE_YEARS,
  SIX_YEARS,
  EVERY_YEAR,
  EVEN_YEARS,
  ODD_YEARS
}

export type CycleKeyStrings = keyof typeof Cycle;
