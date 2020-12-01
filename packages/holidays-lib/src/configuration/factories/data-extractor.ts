import { ErrorKey } from '../errors';
import { IFixedDate, IFixedWeekday, IMove, IRelationWhichWeekdayWhen } from '../specifics';
import { Condition, ConditionKeyStrings } from '../types';
import { Month, MonthKeyStrings } from '../types';
import { MoveTo, MoveToKeyStrings }  from '../types';
import { Weekday, WeekdayKeyStrings } from '../types';
import { When, WhenKeyStrings } from '../types';
import { Which, WhichKeyStrings } from '../types';

export interface IDataExtractor {
  extractFixedDate(obj: any): IFixedDate;
  extractFixedWeekday(obj: any): IFixedWeekday;
  extractMoves(obj: any): Array<IMove>;
  extractStringKey(obj: any): string;
  extractWhichWeekdayWhen(obj: any): IRelationWhichWeekdayWhen;
}

type ErrorHandlerCallBack = (key: string, ...args: Array<any>) => void;

export class DataExtractor implements IDataExtractor {

  //#region Private Properties
  private errorHandlerCallBack: ErrorHandlerCallBack;
  //#endregion

  //#region Constructor & C°
  public constructor(errorHandlerCallBack: ErrorHandlerCallBack) {
    this.errorHandlerCallBack = errorHandlerCallBack;
  }
  //#endregion

  //#region IDataExtractor interface methods
  public extractFixedDate(obj: any): IFixedDate {
    const result: IFixedDate = {
      day: Number(obj.day),
      month: Month[<MonthKeyStrings>obj.month]
    };

    if (!result.day && result.day !== 0) {
      if (!obj.day) {
        this.errorHandlerCallBack(ErrorKey.FIXED_DATE_DAY_MISSING);
      } else  {
        this.errorHandlerCallBack(ErrorKey.FIXED_DATE_DAY_INVALID, obj.day);
      }
    }

    if (result.month === undefined) {
      if (!obj.month || obj.month === '') {
        this.errorHandlerCallBack(ErrorKey.FIXED_DATE_MONTH_MISSING);
      } else {
        this.errorHandlerCallBack(ErrorKey.FIXED_DATE_MONTH_INVALID, obj.day);
      }
    } else if (result.day  || result.day === 0) {
      if (result.day > 0) {
        switch(result.month) {
          case Month.APRIL:
          case Month.JUNE:
          case Month.SEPTEMBER:
          case Month.NOVEMBER: {
            if (result.day > 30) {
              this.errorHandlerCallBack(ErrorKey.FIXED_DATE_DAY_OUT_OF_RANGE, result.day, Month[result.month]);
            }
            break;
          }
          case Month.FEBRUARY: {
            if (result.day > 29) {
              this.errorHandlerCallBack(ErrorKey.FIXED_DATE_DAY_OUT_OF_RANGE, result.day, Month[result.month]);
            }
            break;
          }
          default: {
            if (result.day > 31) {
              this.errorHandlerCallBack(ErrorKey.FIXED_DATE_DAY_OUT_OF_RANGE, result.day, Month[result.month]);
            }
          }
        }
      }
      else {
        this.errorHandlerCallBack(ErrorKey.FIXED_DATE_DAY_OUT_OF_RANGE, result.day);
      }
    }
    return result;
  }

  public extractFixedWeekday(obj: any): IFixedWeekday {
    const result: IFixedWeekday = {
      month: Month[<MonthKeyStrings>obj.month],
      weekday: Weekday[<WeekdayKeyStrings>obj.weekday],
      which: Which[<WhichKeyStrings>obj.which]
    }

    if (result.month === undefined) {
      if (obj.month) {
        this.errorHandlerCallBack(ErrorKey.FIXED_WEEKDAY_MONTH_INVALID, obj.month);
      } else {
        this.errorHandlerCallBack(ErrorKey.FIXED_WEEKDAY_MONTH_MISSING);
      }
    }

    if (result.weekday === undefined) {
      if (obj.weekday) {
        this.errorHandlerCallBack(ErrorKey.FIXED_WEEKDAY_WEEKDAY_INVALID, obj.weekday);
      } else {
        this.errorHandlerCallBack(ErrorKey.FIXED_WEEKDAY_WEEKDAY_MISSING);
      }
    }

    if (result.which === undefined) {
      if (obj.which) {
        this.errorHandlerCallBack(ErrorKey.FIXED_WEEKDAY_WHICH_INVALID, obj.which);
      } else {
        this.errorHandlerCallBack(ErrorKey.FIXED_WEEKDAY_WHICH_MISSING);
      }
    }
    return result;
  }

  public extractMoves(obj: any): Array<IMove> {
    const result = new Array<IMove>();

    if (obj.moves) {
      obj.moves.forEach( (move: any) => {
        if (!move.condition && !move.moveTo && !move.weekday) {
          this.errorHandlerCallBack(ErrorKey.MOVE_EMPTY);
        } else {
          result.push(this.extractMove(move));
        }
      });
    }

    const saturday = result.map(
      (move: IMove) => move.condition === Condition.IS_SATURDAY ? Condition.IS_WEEKEND : move.condition
    );

    if (new Set(saturday).size !== result.length) {
      this.errorHandlerCallBack(ErrorKey.MOVE_DUPLICATE_CONDITIONS, obj.moves);
    } else {
      const sunday = result.map(
        (move: IMove) => move.condition === Condition.IS_SUNDAY ? Condition.IS_WEEKEND : move.condition
      );
      if (new Set(sunday).size !== result.length) {
        this.errorHandlerCallBack(ErrorKey.MOVE_DUPLICATE_CONDITIONS, obj.moves);
      }
    }
    return result;
  }

  public extractStringKey(obj: any): string {
    const result = obj.key;
    if (!result) {
      this.errorHandlerCallBack(ErrorKey.KEY_MISSING);
    }
    return result;
  }

  public extractWhichWeekdayWhen(obj: any): IRelationWhichWeekdayWhen {

    let which = Which.FIRST;
    if (obj.which !== undefined) {
      which = Which[<WhichKeyStrings>obj.which];
      if (which === undefined) {
        if (!obj.which) {
          this.errorHandlerCallBack(ErrorKey.RELATION_WHICH_MISSING);
        } else {
          this.errorHandlerCallBack(ErrorKey.RELATION_WHICH_INVALID, obj.which);
        }
      } else if (which === Which.LAST) {
        this.errorHandlerCallBack(ErrorKey.RELATION_WHICH_INVALID, obj.which);
      }
    }

    const weekday = Weekday[<WeekdayKeyStrings>obj.weekday];
    if (weekday === undefined) {
      if (obj.weekday) {
        this.errorHandlerCallBack(ErrorKey.RELATION_WEEKDAY_INVALID, obj.weekday);
      } else {
        this.errorHandlerCallBack(ErrorKey.RELATION_WEEKDAY_MISSING);
      }
    }

    const when = When[<WhenKeyStrings>obj.when];
    if (when === undefined) {
      if (obj.when) {
        this.errorHandlerCallBack(ErrorKey.RELATION_WHEN_INVALID, obj.when);
      } else {
        this.errorHandlerCallBack(ErrorKey.RELATION_WHEN_MISSING);
      }
    }

    const result: IRelationWhichWeekdayWhen = {
      which,
      weekday,
      when
    }
    return result;
  }
  //#endregion

  //#region Private methos
  private extractMove(obj: any): IMove {
    const result: IMove = {
      condition: Condition[<ConditionKeyStrings>obj.condition],
      moveTo: MoveTo[<MoveToKeyStrings>obj.moveTo],
      weekday: Weekday[<WeekdayKeyStrings>obj.weekday]
    };

    if (result.condition === undefined) {
      if (obj.condition) {
        this.errorHandlerCallBack(ErrorKey.MOVE_CONDITION_INVALID, obj.condition);
      } else {
        this.errorHandlerCallBack(ErrorKey.MOVE_CONDITION_MISSING);
      }
    }

    if (result.moveTo === undefined) {
      if (obj.moveTo) {
        this.errorHandlerCallBack(ErrorKey.MOVE_MOVE_TO_INVALID, obj.moveTo);
      } else {
        this.errorHandlerCallBack(ErrorKey.MOVE_MOVE_TO_MISSING);
      }
    }

    if (result.weekday === undefined) {
      if (obj.weekday) {
        this.errorHandlerCallBack(ErrorKey.MOVE_WEEKDAY_INVALID, obj.weekday);
      } else {
        this.errorHandlerCallBack(ErrorKey.MOVE_WEEKDAY_MISSING);
      }
    }
    return result;
  }
  //#endregion
}
