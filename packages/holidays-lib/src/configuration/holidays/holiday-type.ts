export enum HolidayType {
  CHRISTIAN,
  ETHIOPIAN_ORTHODOX,
  FIXED_DATE,
  FIXED_WEEKDAY_IN_MONTH,
  FIXED_WEEKDAY_BETWEEN_FIXED,
  FIXED_WEEKDAY_RELATIVE_TO_FIX,
  HEBREW,
  ISLAMIC,
  RELATIVE_TO_EASTER_SUNDAY,
  RELATIVE_TO_FIXED,
  RELATIVE_TO_WEEKDAY_IN_MONTH
}

export type HolidayTypeKeyStrings = keyof typeof HolidayType;
