export enum CycleType {
  TWO_YEARS,
  FOUR_YEARS,
  FIVE_YEARS,
  SIX_YEARS,
  EVERY_YEAR,
  EVEN_YEARS,
  ODD_YEARS
}

export type CycleTypeKeyStrings = keyof typeof CycleType;
