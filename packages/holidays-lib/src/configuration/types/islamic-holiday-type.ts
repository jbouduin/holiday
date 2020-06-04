export enum IslamicHolidayType {
  ASCHURA,
  ARAFAAT,
  ID_AL_FITR,
  ID_AL_FITR_2,
  ID_AL_FITR_3,
  ID_UL_ADHA,
  ID_UL_ADHA_2,
  ID_UL_ADHA_3,
  LAILAT_AL_BARAT,
  LAILAT_AL_MIRAJ,
  LAILAT_AL_QADR,
  MAWLID_AN_NABI,
  NEWYEAR,
  RAMADAN,
  RAMADAN_END
}

export type IslamicHolidayTypeKeyStrings = keyof typeof IslamicHolidayType;
