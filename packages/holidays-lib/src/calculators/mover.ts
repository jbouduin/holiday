import { IMove } from '../configuration';
import { Condition, MoveTo } from '../configuration';
import { ICalendarHelper } from './calendar-helper';

export interface IMover {
  moveDate(moves: Array<IMove>, date: Date): Date;
}

export class Mover implements IMover {

  // <editor-fold desc='Private properties'>
  private calendarHelper: ICalendarHelper;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor(calendarHelper: ICalendarHelper) {
    this.calendarHelper = calendarHelper;
  }
  // </editor-fold>

  // <editor-fold desc='IMover interface methods'>
  public moveDate(moves: Array<IMove>, date: Date): Date {
    let cnt = 0;
    const original = date;
    let applicableMoves: Array<IMove> = moves.filter(move => this.mustMove(move, date));

    while (applicableMoves.length > 0 && cnt < 32 ) {
      cnt++;
      date = this.applyMove(applicableMoves[0], date);
      applicableMoves = moves.filter(move => this.mustMove(move, date));
    }

    return cnt === 32 ? original : date;
  }

  // </editor-fold>

  // <editor-fold desc='Private helper methods'>
  private mustMove(move: IMove, date: Date): boolean {
    const day = date.getDay();
    if (move.condition === Condition.IS_WEEKEND) {
      return day === 0 || day === 6;
    } else {
      return day === move.condition;
    }
  }

  private applyMove(move: IMove, date: Date): Date {
    let diff = date.getDay() > move.weekday ?
      move.weekday - date.getDay() + 7:
      move.weekday - date.getDay();
    if (move.moveTo === MoveTo.PREVIOUS) {
      diff = diff - 7;
    }
    return this.calendarHelper.addDays(date, diff);
  }

  // </editor-fold>
}
