export enum Condition {
  IS_SUNDAY,
  IS_MONDAY,
  IS_TUESDAY,
  IS_WEDNESDAY,
  IS_THURSDAY,
  IS_FRIDAY,
  IS_SATURDAY,
  IS_WEEKEND
}

export type ConditionKeyStrings = keyof typeof Condition;
