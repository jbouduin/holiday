export enum HolidayType {
  CHRISTIAN,
  ETHIOPIAN_ORTHODOX,
  FIXED_DATE,
  FIXED_WEEKDAY,
  HEBREW,
  ISLAMIC,
  RELATIVE_BETWEEN_FIXED,
  RELATIVE_TO_DATE,
  RELATIVE_TO_WEEKDAY
}

export type HolidayTypeKeyStrings = keyof typeof HolidayType;
