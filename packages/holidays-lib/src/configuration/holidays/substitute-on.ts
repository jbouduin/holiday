export enum SubstituteOn {
  ON_SUNDAY,
  ON_MONDAY,
  ON_TUESDAY,
  ON_WEDNESDAY,
  ON_THURSDAY,
  ON_FRIDAY,
  ON_SATURDAY,
  ON_WEEKEND
}

export type SubstituteOnKeyStrings = keyof typeof SubstituteOn;
