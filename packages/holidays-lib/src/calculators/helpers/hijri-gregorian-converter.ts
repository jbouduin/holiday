import { IslamicCalendar } from '../../configuration';
import { HijriDate } from '../../configuration/types';

export interface IHijriGregorianConvertor {
  gregorianToHijri(date: Date, calendar: IslamicCalendar): HijriDate;
  hijriToGregorian(hijriDate: HijriDate, calendar: IslamicCalendar): Date;
}

export class HijriGregorianConvertor {

  // <editor-fold desc='Private properties'>
  // </editor-fold>

  // <editor-fold desc='Constructor & C°'>
  public constructor() { }
  // </editor-fold>

  // <editor-fold desc='HijriGregorianConvertor interface methods'>
  public gregorianToHijri(date: Date, calendar: IslamicCalendar): HijriDate {

    if (calendar === IslamicCalendar.UMM_AL_QURA || calendar === IslamicCalendar.TURKEY) {
      throw new Error('Not Implemented');
    } else {
      return this.intercalatedGregorianToHijri(date, calendar);
    }
  }

  public hijriToGregorian(hijriDate: HijriDate, calendar: IslamicCalendar): Date {
    throw new Error('Not Implemented');
  }
  // public hijriToGregorian(day: number, month: number, year: number, calendar: IslamicCalendar): Date {
  //
	// 	const jd = Math.floor((11 * year + 3) / 30) + 354 * year + 30 * month - Math.floor((month - 1) / 2) + day + 1948440 - 385;
  //
  //   let d: number;
  //   let m: number;
  //   let y: number;
  //
	// 	if (jd > 2299160 )	{
	// 		let l = jd + 68569;
	// 		const n = Math.floor((4 * l) / 146097);
	// 		l = l - Math.floor((146097 * n + 3) / 4);
	// 		const i = Math.floor((4000 * (l + 1)) / 1461001);
	// 		l = l - Math.floor((1461 * i) / 4) + 31;
	// 		const j = Math.floor((80 * l) / 2447);
	// 		d= l - Math.floor((2447 * j) / 80);
	// 		l = Math.floor(j / 11);
  //     m= j + 2 - 12 * l;
  //     y = 100 * (n - 49) + i + l;
	// 	} else	{
	// 		let j = jd + 1402;
	// 		const k = Math.floor((j - 1) / 1461);
  //     const l = j - 1461 * k;
  //     const n = Math.floor((l - 1) / 365) - Math.floor(l / 1461);
	// 		let i = l - 365 * n + 30;
	// 		j = Math.floor((80 * i) / 2447);
	// 		d = i - Math.floor((2447 * j) / 80);
  //     i = Math.floor(j / 11);
	// 		m = j + 2 - 12 * i;
  //     y = 4 * k + n + i - 4716
	// 	}
  //
	// 	return new Date(Date.UTC(y, m - 1, d));
  // }
  // </editor-fold>

  // <editor-fold desc='Private methods'>
  private intercalatedGregorianToHijri(date: Date, calendar: IslamicCalendar): HijriDate {
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
    let julianGregorianOffset = 0;
    if(year < 1583) {
      julianGregorianOffset = 0;
    }

    if(year === 1582) {
      if (month > 10) {
        julianGregorianOffset = 10;
      }
      if (month === 10 && day < 5) {
        julianGregorianOffset = 0;
      }
      if (month === 10 && day > 14) {
        julianGregorianOffset = 10;
      }
      if (month === 10 && day > 4 && day < 15) {
        julianGregorianOffset = 10;
        day += 10;
      }
    }

    if(year > 1582) {
      const a = Math.floor(year / 100);
      julianGregorianOffset = a - Math.floor(a / 4) - 2;
    }

    // compute Chronological Julian Day Number (CJDN)
    const cjdn = Math.floor(365.25 * ( year + 4716)) + Math.floor(30.6001 * (month + 1)) + day - julianGregorianOffset - 1524;
    // before Nov 5th, 1582
    if( cjdn < 2299161) {
      julianGregorianOffset = 0;
    }

    if(cjdn > 2299160) {
      const a = Math.floor( (cjdn - 1867216.25) / 36524.25);
      julianGregorianOffset = a-Math.floor(a / 4) + 1;
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
    const epochcivil = 1948085;

    let shift = 0;
    let z = 0;
    switch(calendar) {
      case IslamicCalendar.TAB_Ia:
      case IslamicCalendar.TAB_Ic: {
        shift = 4.01 /30; // results in 2, 5, 7, 10, 13, 15, 18, 21, 24, 26 & 29 as intercalary years
        break;
      }
      case IslamicCalendar.TAB_IIa:
      case IslamicCalendar.TAB_IIc: {
        shift = 3.01 / 30; // results in 2, 5, 7, 10, 13, 16, 18, 21, 24, 26 & 29 as intercalary years
        break;
      }
      case IslamicCalendar.TAB_IIIa:
      case IslamicCalendar.TAB_IIIc: {
        shift = 0.01 / 30; // results in 2, 5, 8, 10, 13, 16, 19, 21, 24, 27 & 29 as intercalary years
        break;
      }
      case IslamicCalendar.TAB_IVa:
      case IslamicCalendar.TAB_IVc: {
        shift = -1.99 / 30; // results in 2, 5, 8, 11, 13, 16, 19, 21, 24, 27 & 30 as intercalary years
      }
    }

    switch(calendar) {
      case IslamicCalendar.TAB_Ia:
      case IslamicCalendar.TAB_IIa:
      case IslamicCalendar.TAB_IIIa:
      case IslamicCalendar.TAB_IVa: {
        z = cjdn - epochastro;
        break;
      }
      case IslamicCalendar.TAB_Ic:
      case IslamicCalendar.TAB_IIc:
      case IslamicCalendar.TAB_IIIc:
      case IslamicCalendar.TAB_IVc: {
        z = cjdn - epochcivil;
        break;
      }
    }

    const cyc = Math.floor(z / 10631);
    z = z - 10631 * cyc;
    const j = Math.floor((z - shift) / iyear);
    const iy = 30 * cyc + j;
    z = z - Math.floor(j * iyear + shift);
    let im = Math.floor((z + 28.5001) / 29.5);
    if(im === 13) {
      im = 12;
    }
    const id = z - Math.floor(29.5001 * im - 29);
    return {
      year: iy,
      month: im,
      day: id
    };
  }
  // </editor-fold>
}
