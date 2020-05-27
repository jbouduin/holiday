export enum Weekday {
  // Do not change the order: the value is used in calculations
  SUNDAY = 0,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY
}

export type WeekdayKeyStrings = keyof typeof Weekday;
