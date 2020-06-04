import { ChronologyType } from '../../configuration';

export interface IHijriGregorianConvertor {
  gregorianToHijri(date: Date): Date;
}

export class HijriGregorianConvertor {

  // <editor-fold desc='Private properties'>
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor() { }
  // </editor-fold>

  // <editor-fold desc='HijriGregorianConvertor interface methods'>
  public gregorianToHijri(date: Date): Date {
    let day: number = date.getDate();
    let month: number = date.getMonth() + 1;
    let year: number = date.getFullYear();

    // append January and February to the previous year (i.e. regard March as
    // the first month of the year in order to simplify leapday corrections)
    if(month < 3) {
      year--;
      month += 12;
    }

    // determine offset between Julian and Gregorian calendar
    let jgc = 0;
    if(year < 1583) {
      jgc = 0;
    }

    if(year === 1582) {
      if (month > 10) {
        jgc = 10;
      }
      if (month === 10 && day < 5) {
        jgc = 0;
      }
      if (month === 10 && day > 14) {
        jgc = 10;
      }
      if (month === 10 && day > 4 && day < 15) {
        jgc = 10;
        day += 10;
      }
    }

    if(year > 1582) {
      const a = Math.floor(year / 100);
      jgc = a - Math.floor(a / 4) - 2;
    }

    // compute Chronological Julian Day Number (CJDN)
    const cjdn = Math.floor(365.25 * ( year + 4716)) + Math.floor(30.6001 * (month + 1)) + day - jgc - 1524;
    if( cjdn < 2299161) {
      jgc = 0;
    }

    if(cjdn > 2299160) {
      const a = Math.floor( (cjdn - 1867216.25) / 36524.25);
      jgc = a-Math.floor(a / 4) + 1;
    }

    const bj = cjdn + 1524;
    let cj = Math.floor((bj - 122.1) / 365.25);
    const dj = Math.floor(365.25 * cj);
    let monthj = Math.floor((bj-dj) / 30.6001);

    if(monthj > 13) {
      cj++;
      monthj -= 12;
    }
    monthj--;

    // set mean length and epochs (astronomical & civilian) of the tabular Islamic year
    const iyear = 10631 / 30;
    const epochastro = 1948084;
    // const epochcivil = 1948085;
    // compute and output Islamic calendar date (type II Astroligical a.k.a. MS HijriCalendar)

    const shift = 3.01 / 30; // results in 2, 5, 7, 10, 13, 16, 18, 21, 24, 26 & 29 as intercalary years
    let z = cjdn - epochastro;
    const cyc = Math.floor(z / 10631);
    z = z - 10631 * cyc;
    const j = Math.floor((z - shift) / iyear);
    const iy = 30 * cyc + j;
    z = z - Math.floor(j * iyear + shift);
    let im = Math.floor((z + 28.5001) / 29.5);
    console.log(im);
    if(im === 13) {
      im = 12;
    }
    const id = z - Math.floor(29.5001 * im - 29);
    return new Date(Date.UTC(iy, im -1, id));
  }

  // public hijriToGregorian(day: number, month: number, year: number): Date {
  //   return new Date();
  // }
  // </editor-fold>

  // <editor-fold desc='Private methods'>
  // Determine Gregorian absolute day from provided-in day/month/year
  // Month is 1-base !
  // private gregorianAbsolute(day: number, month: number, year: number): number {
  //   /* accumulate the days in prior months of the year */
  //   for (let m = month - 1; m > 0; m--) {
  //     day += new Date(Date.UTC(year, m + 1, 0)).getDay();
  //   }
  //   return day +				             /* days this year */
  //     365 * (year - 1) +		         /* previous years days ignoring leap */
  //     Math.floor((year - 1) / 4) -	 /* Julian leap days before this year.. */
  //     Math.floor((year - 1) / 100) + /* ..minus prior century years... */
  //     Math.floor((year - 1) / 400);  /* ..plus prior years divisible by 400 */
  // }

  // calculate the Hijri absolute day from provided day/month/year
  // private hijriAbsolute(day: number, month: number, year: number): number {
  //   return day +                            /* days so far this month */
  //     (29 * (month - 1)) +	                /* days so far... */
  //     Math.floor(month / 2) +		            /* ...this year */
  //     (354 * (year - 1)) +  		            /* non-leap days in prior years */
  //     Math.floor((3 + (11 * year)) / 30) +	/* leap days in prior years */
  //     this.hijriEpoch - 1;		              /* days before start of calendar */
  // }

  // determine wheter the provided year of the hijri calendar is a leap year
  // private hijriLeapYear(year: number): boolean {
  //   return Math.abs(((11 * year) + 14) % 30) < 11;
  // }

  // determine the number of days of the provided month and year of the hijri calendar
  // private hijriNumberOfDays(month: number, year: number) {
  //   /* Last day in month during year on the Islamic calendar. */
  //   if (((month % 2) == 1) || ((month == 12) && this.hijriLeapYear(year)))
  //     return (30);
  //   else
  //     return (29);
  // }
  // </editor-fold>
}
