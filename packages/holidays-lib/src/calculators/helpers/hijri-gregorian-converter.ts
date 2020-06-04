export interface IHijriGregorianConvertor {
  gregorianToHijri(date: Date): Date;
}

export class HijriGregorianConvertor {

  // <editor-fold desc='Private properties'>
  private readonly hijriEpoch: number;
  private readonly gregorianEpoch: number;
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor() {
    // Absolute date of start of Islamic calendar (July 19, 622 Gregorian)
    this.hijriEpoch = 227015;
    this.gregorianEpoch = 1;
  }
  // </editor-fold>

  // <editor-fold desc='HijriGregorianConvertor interface methods'>
  public gregorianToHijri(date: Date): Date {
    let absoluteDate: number;
    let resultYear: number;

    absoluteDate = this.gregorianAbsolute(
      date.getDay(),
      date.getMonth() + 1,
      /* Account for Pre-Epoch date correction, year 0 entry */
      date.getFullYear() < 0 ? date.getFullYear() + 1 : date.getFullYear());
    console.log(absoluteDate);
    /* Search forward/backward year by year from approximate year */
    if (absoluteDate < this.hijriEpoch) {
      resultYear = 0;
      while (absoluteDate <= this.hijriAbsolute(1, 1, resultYear)) {
        resultYear--;
      }
    } else {
      resultYear = Math.floor((absoluteDate - this.hijriEpoch - 1) / 355);
      while (absoluteDate >= this.hijriAbsolute(1, 1, resultYear + 1))
        resultYear++;
    }

    /* Search forward month by month from Muharram */
    let resultMonth = 1;
    while (absoluteDate > this.hijriAbsolute(
        this.hijriNumberOfDays(resultMonth, resultYear),
        resultMonth,
        resultYear)) {
            resultMonth++;
    }

    const resultDay = absoluteDate - this.hijriAbsolute(1, resultMonth, resultYear) + 1;

    /* Account for Pre-Hijrah date correction, year 0 entry */
    if (resultYear <= 0) {
      resultYear--;
    }

    return new Date(Date.UTC(resultYear, resultMonth - 1, resultDay));
  }

  public hijriToGregorian(day: number, month: number, year: number): Date {
    return new Date();
  }
  // </editor-fold>

  // <editor-fold desc='Private methods'>
  // Determine Gregorian absolute day from provided-in day/month/year
  // Month is 1-base !
  private gregorianAbsolute(day: number, month: number, year: number): number {
    /* accumulate the days in prior months of the year */
    for (let m = month - 1; m > 0; m--) {
      day += new Date(Date.UTC(year, m + 1, 0)).getDay();
    }
    return day +				             /* days this year */
      365 * (year - 1) +		         /* previous years days ignoring leap */
      Math.floor((year - 1) / 4) -	 /* Julian leap days before this year.. */
      Math.floor((year - 1) / 100) + /* ..minus prior century years... */
      Math.floor((year - 1) / 400);  /* ..plus prior years divisible by 400 */
  }

  // calculate the Hijri absolute day from provided day/month/year
  private hijriAbsolute(day: number, month: number, year: number): number {
    return day +                            /* days so far this month */
      (29 * (month - 1)) +	                /* days so far... */
      Math.floor(month / 2) +		            /* ...this year */
      (354 * (year - 1)) +  		            /* non-leap days in prior years */
      Math.floor((3 + (11 * year)) / 30) +	/* leap days in prior years */
      this.hijriEpoch - 1;		              /* days before start of calendar */
  }

  // determine wheter the provided year of the hijri calendar is a leap year
  private hijriLeapYear(year: number): boolean {
    return Math.abs(((11 * year) + 14) % 30) < 11;
  }

  // determine the number of days of the provided month and year of the hijri calendar
  private hijriNumberOfDays(month: number, year: number) {
    /* Last day in month during year on the Islamic calendar. */
    if (((month % 2) == 1) || ((month == 12) && this.hijriLeapYear(year)))
      return (30);
    else
      return (29);
  }



  // </editor-fold>
}
