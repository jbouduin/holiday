export enum When {
  // values are used in calculations !
  BEFORE = -1,
  AFTER = 1
}

export type WhenKeyStrings = keyof typeof When;
