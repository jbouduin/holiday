export enum ErrorKey {
  //#region File related errors
  FILE_NOT_FOUND = 'File not found',
  COULD_NOT_READ_FILE = 'Could not read file',
  INVALID_FILE_CONTENTS = 'Invalid JSON',
  //#endregion

  //#region Configuration errors
  HIERARCHY_INVALID = 'Invalid hierarchy',
  HIERARCHY_NOT_SPECIFIED = 'No hierarchy specified',
  DESCRIPTION_NOT_SPECIFIED = 'No description specified',
  HOLIDAY_COLLECTION_MISSING = 'Missing holiday collection',
  HOLIDAY_COLLECTION_EMPTY = 'Empty holiday collection',
  NO_VALID_HOLIDAYS_IN_COLLECTION = 'No valid holidays found',
  //#endregion

  //#region Base Holiday errors
  KEY_MISSING = 'Missing key',
  HOLIDAY_TYPE_INVALID = 'Invalid holidayType',
  HOLIDAY_CATEGORY_INVALID = 'Invalid category',
  HOLIDAY_CYCLE_INVALID = 'Invalid cycletype',
  HOLIDAY_CYCLE_REQUIRES_VALID_FROM = 'The specified cycletype requires a valid valid from',
  VALID_FROM_INVALID = 'Invalid valid from',
  VALID_TO_INVALID = 'Invalid valid to',
  VALID_TO_BEFORE_VALID_FROM = 'Valid to is before valid from',
  //#endregion// Holiday level Errors

  //#region Islamic Holiday errors
  ISLAMIC_TYPE_MISSING = 'Type for Islamic Holiday is missing',
  ISLAMIC_TYPE_INVALID = 'Invalid Type for Islamic Holiday',
  //#endregion

  //#region Ehtiopian-Orthodox holiday errors
  ETHIOPIAN_ORTHODOX_TYPE_MISSING = 'Type for Ethiopian-orthodox Holiday is missing',
  ETHIOPIAN_ORTHODOX_TYPE_INVALID = 'Invalid Type for Ethiopian-orthodox Holiday',
  //#endregion

  //#region Christian holiday errors
  CHRISTIAN_TYPE_MISSING = 'Type for Christian Holiday is missing',
  CHRISTIAN_TYPE_INVALID = 'Invalid Type for Christian Holiday',
  CHRISTIAN_CHRONOLOGY_INVALID = 'Invalid Type for Christian Holiday',
  //#endregion// Islamic Holiday error

  //#region Relative between fixed holiday errors
  RELATIVE_BETWEEN_FIXED_FROM_MISSING = 'From is missing from relative between fixed dates holiday',
  RELATIVE_BETWEEN_FIXED_TO_MISSING = 'To is missing from relative between fixed dates holiday',
  RELATIVE_BETWEEN_FIXED_FIX_TO_BEFORE_FROM = 'Fix to is before fix from in relative between fixed dates holiday',
  RELATIVE_BETWEEN_FIXED_SPAN_INVALID = 'Tiemspan is invalid in relative between fixed dates holiday',
  //#endregion

  //#region Fixed date Errors
  FIXED_DATE_DAY_INVALID = 'Invalid day in fixed date',
  FIXED_DATE_DAY_MISSING = 'Day missing in fixed date',
  FIXED_DATE_MONTH_INVALID = 'Invalid month in fixed date',
  FIXED_DATE_MONTH_MISSING = 'Month missing in fixed date',
  FIXED_DATE_DAY_OUT_OF_RANGE = 'Day out of range',
  //#endregion

  //#region Fixed weekday error
  FIXED_WEEKDAY_MONTH_INVALID = 'Invalid month in fixed weekday',
  FIXED_WEEKDAY_MONTH_MISSING = 'Month missing in fixed weekday',
  FIXED_WEEKDAY_WEEKDAY_INVALID = 'Invalid weekday in fixed weekday',
  FIXED_WEEKDAY_WEEKDAY_MISSING = 'Weekday missing in fixed weekday',
  FIXED_WEEKDAY_WHICH_INVALID = 'Invalid which in fixed weekday',
  FIXED_WEEKDAY_WHICH_MISSING = 'which missing in fixed weekday',
  //#endregion

  //#region Relative holidays errors
  RELATIVE_FIX_MISSING = 'Fix is missing from relative holiday',
  RELATIVE_FIX_EMPTY = 'Fix is empty for relative holiday',
  RELATIVE_RELATION_MISSING = 'Relation is missing from relative holiday',
  RELATIVE_RELATION_EMPTY = 'Relations is empty for relative holiday',
  //#endregion

  //#region Relation errors
  RELATION_WEEKDAY_INVALID = 'Invalid Weekday in relation',
  RELATION_WEEKDAY_MISSING = 'Weekday is missing from relation',
  RELATION_WHEN_INVALID = 'Invalid when in relation',
  RELATION_WHEN_MISSING = 'When is missing in relation',
  RELATION_WHICH_INVALID = 'Invalid which in relation',
  RELATION_WHICH_MISSING = 'Which is missing in relation',
  //#endregion

  //#region Move condition related
  MOVE_EMPTY = 'Move is empty',
  MOVE_CONDITION_INVALID = 'Invalid condition in move',
  MOVE_CONDITION_MISSING = 'Condition is missing from move',
  MOVE_MOVE_TO_INVALID = 'Invalid moveTo in move',
  MOVE_MOVE_TO_MISSING = 'MoveTo is missing from move',
  MOVE_WEEKDAY_INVALID = 'Invalid Weekday in move',
  MOVE_WEEKDAY_MISSING = 'Weekday is missing from move',
  MOVE_DUPLICATE_CONDITIONS = 'Duplicate conditions in move collection detected'
  //#endregion
}
