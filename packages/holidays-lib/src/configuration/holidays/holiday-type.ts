export enum HolidayType {
  OFFICIAL_HOLIDAY,
  UNOFFICIAL_HOLIDAY
}

export type HolidayTypeKeyStrings = keyof typeof HolidayType;
