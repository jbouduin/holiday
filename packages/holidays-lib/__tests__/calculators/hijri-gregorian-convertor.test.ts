import { IHijriGregorianConvertor, HijriGregorianConvertor} from '../../src/calculators/helpers'
import { IslamicCalendar, HijriDate } from '../../src/configuration';

const convertor: IHijriGregorianConvertor = new HijriGregorianConvertor();

// these are a kind of random tests, covering 100% of the code
const each = [
  [ new Date(Date.UTC(2020, 0, 1)), { year: 1441, month: 5, day: 6 } ],
  [ new Date(Date.UTC(2019, 11, 25)), { year: 1441, month: 4, day: 28 } ],
  [ new Date(Date.UTC(1580, 11, 24)), { year: 988, month: 11, day: 18 } ],
  [ new Date(Date.UTC(1582, 11, 24)), { year: 990, month: 11, day: 29 } ],
  [ new Date(Date.UTC(1582, 9, 4)), { year: 990, month: 9, day: 17 } ],
  [ new Date(Date.UTC(1582, 9, 20)), { year: 990, month: 9, day: 23 } ],
  [ new Date(Date.UTC(1582, 9, 10)), { year: 990, month: 9, day: 23 } ],
  [ new Date(Date.UTC(1582, 11, 20)), { year: 990, month: 11, day: 25 } ],
  [ new Date(Date.UTC(1583, 0, 20)), { year: 990, month: 12, day: 26 } ],
  [ new Date(Date.UTC(1585, 0, 1)), { year: 992, month: 12, day: 30 } ]
];

describe.each(each)('Gregorian to Hijri', (gregorian: Date, hijri: HijriDate) => {
  test(gregorian.toDateString(), () => expect(convertor.gregorianToHijri(gregorian, IslamicCalendar.TAB_IIa)).toStrictEqual(hijri));
});

// test all intercalated methods
describe.each( [
  [ IslamicCalendar.TAB_Ia, new Date(Date.UTC(2020, 0, 1))],
  [ IslamicCalendar.TAB_Ic, new Date(Date.UTC(2020, 0, 2))],
  [ IslamicCalendar.TAB_IIa, new Date(Date.UTC(2020, 0, 1))],
  [ IslamicCalendar.TAB_IIc, new Date(Date.UTC(2020, 0, 2))],
  [ IslamicCalendar.TAB_IIIa, new Date(Date.UTC(2020, 0, 1))],
  [ IslamicCalendar.TAB_IIIc, new Date(Date.UTC(2020, 0, 2))],
  [ IslamicCalendar.TAB_IVa, new Date(Date.UTC(2020, 0, 1))],
  [ IslamicCalendar.TAB_IVc, new Date(Date.UTC(2020, 0, 2))]
])('Test all intercalated methods', (islamicCalendar: IslamicCalendar, gregorian: Date) => {
  const hijri: HijriDate = { year: 1441, month: 5, day: 6  };
  test(IslamicCalendar[islamicCalendar], () => expect(convertor.gregorianToHijri(gregorian, islamicCalendar)).toStrictEqual(hijri));
});
// <editor-fold desc='The not implemented methods'>
test(IslamicCalendar[IslamicCalendar.UMM_AL_QURA],
  () => {
    function convert() {
      convertor.gregorianToHijri(new Date(2020,2,2), IslamicCalendar.UMM_AL_QURA);
    }
    expect(convert).toThrow();
  }
);

test(IslamicCalendar[IslamicCalendar.TURKEY],
  () => {
    function convert() {
      convertor.gregorianToHijri(new Date(2020,2,2), IslamicCalendar.TURKEY);
    }
    expect(convert).toThrow();
  }
);

test('Hijri to Gregorian',
  () => {
    function convert() {
      convertor.hijriToGregorian({year: 0, month: 1, day: 1}, IslamicCalendar.TAB_Ia);
    }
    expect(convert).toThrow();
  }
);
// </editor-fold>
