export enum ErrorKeys {
  // <editor-fold desc='File related errors'>
  FILE_NOT_FOUND = 'File not found',
  COULD_NOT_READ_FILE = 'Could not read file',
  INVALID_FILE_CONTENTS = 'Invalid JSON',
  // </editor-fold>

  // <editor-fold desc='Configuration errors'>
  HIERARCHY_INVALID = 'Invalid hierarchy',
  HIERARCHY_NOT_SPECIFIED = 'No hierarchy specified',
  DESCRIPTION_NOT_SPECIFIED = 'No description specified',
  HOLIDAY_COLLECTION_MISSING = 'Missing holiday collection',
  HOLIDAY_COLLECTION_EMPTY = 'Empty holiday collection',
  NO_VALID_HOLIDAYS_IN_COLLECTION = 'No valid holidays found',
  // </editor-fold>

  // <editor-fold desc='Base Holiday errors'>
  KEY_MISSING = 'Missing key',
  HOLIDAY_TYPE_INVALID = 'Invalid holidayType',
  CYCLE_TYPE_INVALID = 'Invalid cycletype',
  HOLIDAY_STATUS_INVALID = 'Invalid holidayStatus',
  VALID_FROM_INVALID = 'Invalid valid from',
  VALID_TO_INVALID = 'Invalid valid to',
  VALID_TO_BEFORE_VALID_FROM = 'Valid to is before valid from',
  CYCLE_TYPE_REQUIRES_VALID_FROM = 'The specified cycletype requires a valid valid from',
  // </editor-fold>// Holiday level Errors

  // <editor-fold desc='Islamic Holiday errors'>
  ISLAMIC_TYPE_MISSING = 'Type for Islamic Holiday is missing',
  ISLAMIC_TYPE_INVALID = 'Invalid Type for Islamic Holiday',
  // </editor-fold>

  // <editor-fold desc='Ehtiopian-Orthodox holiday errors'>
  ETHIOPIAN_ORTHODOX_TYPE_MISSING = 'Type for Ethiopian-orthodox Holiday is missing',
  ETHIOPIAN_ORTHODOX_TYPE_INVALID = 'Invalid Type for Ethiopian-orthodox Holiday',
  // </editor-fold>

  // <editor-fold desc='Christian holiday errors'>
  CHRISTIAN_TYPE_MISSING = 'Type for Christian Holiday is missing',
  CHRISTIAN_TYPE_INVALID = 'Invalid Type for Christian Holiday',
  CHRISTIAN_CHRONOLOGY_INVALID = 'Invalid Type for Christian Holiday',
  // </editor-fold>// Islamic Holiday error

  // <editor-fold desc='Relative between fixed holiday errors'>
  RELATIVE_BETWEEN_FIXED_FROM_MISSING = 'From is missing from relative between fixed dates holiday',
  RELATIVE_BETWEEN_FIXED_TO_MISSING = 'To is missing from relative between fixed dates holiday',
  // RELATIVE_BETWEEN_FIXED_WEEKDAY_INVALID = 'Invalid Weekday in relative between fixed dates holiday',
  // RELATIVE_BETWEEN_FIXED_WEEKDAY_MISSING = 'Weekday is missing from relative between fixed dates holiday',
  RELATIVE_BETWEEN_FIXED_FIX_TO_BEFORE_FROM = 'Fix to is before fix from in relative between fixed dates holiday',
  RELATIVE_BETWEEN_FIXED_SPAN_INVALID = 'Tiemspan is invalid in relative between fixed dates holiday',
  // </editor-fold>

  // <editor-fold desc='Fixed date Errors'>
  FIXED_DATE_DAY_INVALID = 'Invalid day in fixed date',
  FIXED_DATE_DAY_MISSING = 'Day missing in fixed date',
  FIXED_DATE_MONTH_INVALID = 'Invalid month in fixed date',
  FIXED_DATE_MONTH_MISSING = 'Month missing in fixed date',
  FIXED_DATE_DAY_OUT_OF_RANGE = 'Day out of range',
  // </editor-fold>

  // <editor-fold desc='Fixed weekday error'>
  FIXED_WEEKDAY_MONTH_INVALID = 'Invalid month in fixed date',
  FIXED_WEEKDAY_MONTH_MISSING = 'Month missing in fixed date',
  FIXED_WEEKDAY_WEEKDAY_INVALID = 'Invalid weekday in fixed date',
  FIXED_WEEKDAY_WEEKDAY_MISSING = 'Weekday missing in fixed date',
  FIXED_WEEKDAY_WHICH_INVALID = 'Invalid which in fixed date',
  FIXED_WEEKDAY_WHICH_MISSING = 'which missing in fixed date',
  // </editor-fold>

  // <editor-fold desc='Relative holidays errors'>
  RELATIVE_FIX_MISSING = 'Fix is missing from relative holiday',
  RELATIVE_FIX_EMPTY = 'Fix is empty for relative holiday',
  RELATIVE_RELATION_MISSING = 'Relation is missing from relative holiday',
  RELATIVE_RELATION_EMPTY = 'Relations is empty for relative holiday',
  // </editor-fold>

  // <editor-fold desc='Relation errors'>
  RELATION_WEEKDAY_INVALID = 'Invalid Weekday in relation',
  RELATION_WEEKDAY_MISSING = 'Weekday is missing from relation',
  RELATION_WHEN_INVALID = 'Invalid when in relation',
  RELATION_WHEN_MISSING = 'When is missing in relation',
  RELATION_WHICH_INVALID = 'Invalid which in relation',
  RELATION_WHICH_MISSING = 'Which is missing in relation',
  // </editor-fold>
}
