export enum ChronologyType {
  GREGORIAN,
  JULIAN
}

export type ChronologyTypeKeyStrings = keyof typeof ChronologyType;
