export enum HolidayStatus {
  OFFICIAL_HOLIDAY,
  UNOFFICIAL_HOLIDAY
}

export type HolidayStatusKeyStrings = keyof typeof HolidayStatus;
