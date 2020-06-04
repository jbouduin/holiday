import { IHijriGregorianConvertor, HijriGregorianConvertor} from '../../src/calculators/helpers'

const convertor: IHijriGregorianConvertor = new HijriGregorianConvertor();

// these are a kind of random tests, covering 100% of the code
describe.each([
  [ new Date(Date.UTC(2020, 0, 1)), new Date(Date.UTC(1441, 4, 6)) ],
  [ new Date(Date.UTC(2019, 11, 25)), new Date(Date.UTC(1441, 3, 28)) ],
  [ new Date(Date.UTC(1580, 11, 24)), new Date(Date.UTC(988, 10, 18)) ],
  [ new Date(Date.UTC(1582, 11, 24)), new Date(Date.UTC(990, 10, 29)) ],
  [ new Date(Date.UTC(1582, 9, 4)), new Date(Date.UTC(990, 8, 17)) ],
  [ new Date(Date.UTC(1582, 9, 20)), new Date(Date.UTC(990, 8, 23)) ],
  [ new Date(Date.UTC(1582, 9, 10)), new Date(Date.UTC(990, 8, 23)) ],
  [ new Date(Date.UTC(1582, 11, 20)), new Date(Date.UTC(990, 10, 25)) ],
  [ new Date(Date.UTC(1583, 0, 20)), new Date(Date.UTC(990, 11, 26)) ],
  [ new Date(Date.UTC(1585, 0, 1)), new Date(Date.UTC(992, 11, 30)) ],
])('Gregorian to Hijri', (gregorian: Date, hijri:Date) => {
  test(gregorian.toDateString(), () => expect(convertor.gregorianToHijri(gregorian)).toStrictEqual(hijri));
});
