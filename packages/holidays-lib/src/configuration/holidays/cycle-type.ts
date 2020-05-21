export enum CycleType {
  TWO_YEARS,
  FOUR_YEARS,
  FIVE_YEARS,
  SIX_YEARS,
  EVEN_YEARS,
  EVERY_YEAR,
  ODD_YEARS
}

export type CycleTypeKeyStrings = keyof typeof CycleType;
