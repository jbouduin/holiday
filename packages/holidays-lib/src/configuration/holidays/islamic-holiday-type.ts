export enum IslamicHolidayType {
  ASCHURA,
  ID_AL_FITR,
  ID_UL_ADHA,
  LAILAT_AL_BARAT,
  LAILAT_AL_MIRAJ,
  LAILAT_AL_QADR,
  MAWLID_AN_NABI,
  NEWYEAR,
  RAMADAN
}

export type IslamicHolidayTypeKeyStrings = keyof typeof IslamicHolidayType;
