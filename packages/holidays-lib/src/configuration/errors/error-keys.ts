export enum ErrorKeys {
  // File errors
  FILE_NOT_FOUND = 'File not found',
  COULD_NOT_READ_FILE = 'Could not read file',
  INVALID_FILE_CONTENTS = 'Invalid JSON',
  // Configuration level errors
  HIERARCHY_INVALID = 'Invalid hierarchy',
  HIERARCHY_NOT_SPECIFIED = 'No hierarchy specified',
  DESCRIPTION_NOT_SPECIFIED = 'No description specified',
  HOLIDAY_COLLECTION_MISSING = 'Missing holiday collection',
  HOLIDAY_COLLECTION_EMPTY = 'Empty holiday collection',
  NO_VALID_HOLIDAYS_IN_COLLECTION = 'No valid holidays found',
  // Holiday level Errors
  KEY_MISSING = 'Missing key',
  HOLIDAY_TYPE_INVALID = 'Invalid holidayType',
  CYCLE_TYPE_INVALID = 'Invalid cycletype',
  HOLIDAY_STATUS_INVALID = 'Invalid holidayStatus',
  VALID_FROM_INVALID = 'Invalid valid from',
  VALID_TO_INVALID = 'Invalid valid to',
  VALID_TO_BEFORE_VALID_FROM = 'Valid to is before valid from',
  CYCLE_TYPE_REQUIRES_VALID_FROM = 'The specified cycletype requires a valid valid from',
  // Fixed date Errors
  FIXED_DATE_DAY_INVALID = 'Invalid day in fixed date',
  FIXED_DATE_DAY_MISSING = 'Day missing in fixed date',
  FIXED_DATE_MONTH_INVALID = 'Invalid month in fixed date',
  FIXED_DATE_MONTH_MISSING = 'Month missing in fixed date',
  FIXED_DATE_DAY_OUT_OF_RANGE = 'Day out of range',
  // Islamic Holiday error
  ISLAMIC_TYPE_MISSING = 'Type for Islamic Holiday is missing',
  ISLAMIC_TYPE_INVALID = 'Invalid Type for Islamic Holiday',
  // Islamic Holiday error
  ETHIOPIAN_ORTHODOX_TYPE_MISSING = 'Type for Ethiopian-orthodox Holiday is missing',
  ETHIOPIAN_ORTHODOX_TYPE_INVALID = 'Invalid Type for Ethiopian-orthodox Holiday',
}
