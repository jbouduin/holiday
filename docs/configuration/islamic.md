# Islamic holidays

## holiday definition

### Properties
| Property    | Mandatory | Default   | Description      |
| ---------   | :-------: | --------- | ---------------- |
| holidayType | yes       |           | must be: ISLAMIC |
| key         | yes       |           | see below        |

### Implemented Islamic holidays

| Key             | Occurs                       |
| --------------- | ---------------------------- |
| NEWYEAR         | 01/01 |
| ASCHURA         | 10/01 |
| LAILAT_AL_MIRAJ | 27/07 |
| LAILAT_AL_BARAT | 15/08 |
| RAMADAN         | 01/09 |
| ID_AL_FITR      | 01/10 |
| ID_AL_FITR_2    | 02/10 |
| ID_AL_FITR_3    | 03/10 |
| LAILAT_AL_QADR  | |
| MAWLID_AN_NABI  | |
| RAMADAN_END     | |
| ARAFAAT         | 09/12 |
| ID_UL_ADHA      | 10/12 |
| ID_UL_ADHA_2    | 11/12 |
| ID_UL_ADHA_3    | 12/12 |

### Sample
```json
{
  "holidayType": "ISLAMIC",
  "key": "NEWYEAR"
}
```
## Credits and sources

- the lisp code from GNU Emacs' cal-islam.el which itself is based on [Calendrical Calculations](https://www.reingold.co/cc-paper.pdf) by Nachum Dershowitz and Edward M. Reingold.
- [The Islamic Tools and Libraries (ITL) project](https://github.com/arabeyes-org/ITL)
- [Webpages on the History of Astronomy by Robert Harry van Gent](http://www.staff.science.uu.nl/~gent0113/homepage.htm)

## Details
#### Calculation methods:
##### Umm al-Qura
Saudi Arabia has employed a calculated lunar calendar which is commonly referred to as the “Umm al-Qura calendar”. It is also followed by several neighbouring states on the Arabian Peninsula such as Bahrain and Qatar.

##### Islamic calendar of Turkey
The Islamic calendar of Turkey is used by Turkish Muslims in Asia Minor and in Turkish Muslim communities in Europe and elsewhere.
As the Umm al-Qura calendar of Saudi Arabia, the Islamic calendar of Turkey is based on the computed visibility of the lunar crescent. However, as the rules for computing the first visibility of the lunar crescent are different, the dates observed in both calendars can occasionally differ by a day.

##### Arithmetical or Tabular Calendar
based on the ḥisābi calendar, i.e. the arithmetical or tabular calendar, introduced by Muslim astronomers in the 8th century CE to predict the approximate begin of the months in the Islamic lunar calendar. This calendar is sometimes referred to as the Fātimid calendar but this is in fact one of several almost identical tabular Islamic calendars.

The months in the tabular Islamic calendar are assumed to be alternately 30 and 29 days in length resulting in a normal calendar year of 354 days (al-sanat al-basīṭa). In order to keep the calendar in step with the lunar phases every two or three years an extra day is added at the end of the year to the last month resulting in a calendar year of 355 days (al-sanat al-kabīsa).

###### The 30-Year Intercalation Scheme
According to the most commonly adopted method 11 intercalary days are added in every 30 years

Several slightly different intercalary schemes have been described in the literature which can be summarized as follows:

| Type | Intercalary years with 355 days in each 30-year cycle |	Origin/Usage |
| :--: | ----------------------------------------------------- | ------------- |
|  I   |	2, 5, 7, 10, 13, 15, 18, 21, 24, 26 & 29 	| Kūshyār ibn Labbān, Ulugh Beg, Taqī ad-Dīn Muḥammad ibn Maʾruf |
|  II  |	2, 5, 7, 10, 13, 16, 18, 21, 24, 26 & 29 	|al-Fazārī, al-Khwārizmī, al-Battānī, Toledan Tables, Alfonsine Tables, MS HijriCalendar |
| III  |	2, 5, 8, 10, 13, 16, 19, 21, 24, 27 & 29 |	Fāṭimid calendar (also known as the Ismāʿīlī, Ṭayyibī or Bohorā calendar), Ibn al-Ajdābī|
|  IV  |	2, 5, 8, 11, 13, 16, 19, 21, 24, 27 & 30 |	Ḥabash al-Ḥāsib, al-Bīrūnī, Elias of Nisibis |

###### Supported/Planned calculation methods:
| Enum value  | Description | Implementation status |
| ----------- | ----------- | :-------------------: |
| UMM_AL_QURA | Umm al-Qura | :x: |
| TURKEY      | Islamic calendar of Turkey | :x: |
| TAB_Ic      | Tabular I (East Islamic) civil | :x: |
| TAB_Ia      | Tabular I (East Islamic) astronomical | :x: |	  		  	
| TAB_IIc     | Tabular II (West Islamic) civil | :x: |
|	TAB_IIa     | Tabular II (West Islamic) astronomical | :x: |
| TAB_IIIc    | Tabular III (Ismāʿīlī, Fāṭimid, Ṭayyibī, Bohorā) civil | :x: |
| TAB_IIIa    | Tabular III (Ismāʿīlī, Fāṭimid, Ṭayyibī, Bohorā) astronomical | :x: |
| TAB_IVc     | Tabular IV (Ḥabash al-Ḥāsib) civil | :x: |
| TAB_IVa     | Tabular IV (Ḥabash al-Ḥāsib) astronomical | :x: |

#### Various important Islamic/Hijri Events
| DD/MM | description | IslamicHolidayType |
| :---: | ----------- | ------------------ |
| 01/01 | Islamic New Year | NEWYEAR  |
| 15/01 | Battle of Qadisiah (14 A.H) |   |
| 10/01 | Aashura | ASHURA |
| 10/02 | Start of Omar ibn Abd Al-Aziz Khilafah (99 A.H) | |
| 04/03 | Start of Islamic calander by Omar Ibn Al-Khattab (16 A.H) | |
| 12/03 | Birth of the Prophet (PBUH) | |
| 20/03 | Liberation of Bait AL-Maqdis by Omar Ibn Al-Khattab (15 A.H) | |
| 25/04 | Battle of Hitteen (583 A.H) | |
| 05/05 | Battle of Muatah (8 A.H) | |
| 27/07 | Salahuddin liberates Bait Al-Maqdis from crusaders | |
| 27/07 | Al-Israa wa Al-Miaaraj | LAILAT_AL_MIRAJ |
| 15/08 | Lailat al-Barā'a | LAILAT_AL_BARAT |
| 01/09 | First day of month-long Fasting | RAMADAN  |
| 17/09 | Battle of Badr (2 A.H) |   |
| 21/09 | Liberation of Makkah (8 A.H) |   |
| 21/09 | Quran Revealed - day #1 |   |
| 22/09 | Quran Revealed - day #2 |   |
| 23/09 | Quran Revealed - day #3 |   |
| 24/09 | Quran Revealed - day #4 |   |
| 25/09 | Quran Revealed - day #5 |   |
| 26/09 | Quran Revealed - day #6 |   |
| 27/09 | Quran Revealed - day #7 |   |
| 28/09 | Quran Revealed - day #8 |   |
| 29/09 | Quran Revealed - day #9 |   |
| 01/10 | Eid Al-Fitr | ID_AL_FITR / RAMADAN_END |
| 02/10 | Eid Al-Fitr - day #2 | ID_AL_FITR_2 |
| 03/10 | Eid Al-Fitr - day #3 | ID_AL_FITR_3 |
| 06/10 | Battle of Uhud (3 A.H) |   |
| 10/10 | Battle of Hunian (8 A.H) |   |
| 08/12 | Hajj to Makkah - day #1 |   |
| 09/12 | Hajj to Makkah - day #2 |   |
| 09/12 | Day of Arafah | ARAFAAT  |
| 10/12 | Hajj to Makkah - day #3 |   |
| 10/12 | Eid Al-Adhaa - day #1 | ID_UL_ADHA |
| 11/12 | Eid Al-Adhaa - day #2 | ID_UL_ADHA_2 |
| 12/12 | Eid Al-Adhaa - day #3 | ID_UL_ADHA_3 |

*Laylat al-Qadr*: According to many Muslim sources, it was one of the odd-numbered nights of the last ten days of Ramadan, the ninth month of the Islamic calendar.
*Mawlid* or *Mawlid al-Nabi al-Sharif* (Arabic: مَولِد النَّبِي‎, romanized: mawlidu n-nabiyyi, lit. 'Birth of the Prophet', sometimes simply called in colloquial Arabic مولد, mawlid, mevlid, mevlit, mulud, among other vernacular pronunciations; sometimes ميلاد, mīlād) is the observance of the birthday of Islamic prophet Muhammad which is commemorated in Rabi' al-awwal, the third month in the Islamic calendar.[4] 12th Rabi' al-awwal[5] is the accepted date among most of the Sunni scholars, while Shi'a scholars regard 17th Rabi' al-awwal as the accepted date.
