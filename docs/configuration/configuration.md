## Structure
Holiday definitions are stored in json files like this one:

```json
{
  "hierarchy": "xx",
  "description": "Country xx",
  "holidays": [
    {
      "holidayType": "CHRISTIAN",
      "key": "EASTER"
    },
    {
      "holidayType": "FIXED_DATE",
      "key": "CHRISTMAS",
      "month": "DECEMBER",
      "day": 25
    },
    {
      "holidayType": "FIXED_DATE",
      "key": "STEPHENS",
      "month": "DECEMBER",
      "day": 26
    },
    {
      "holidayType": "FIXED_DATE",
      "key": "NEW_YEARS_EVE",
      "month": "DECEMBER",
      "day": 31,
      "category": "UNOFFICIAL_HOLIDAY"
    }
  ],
  "subConfigurations": [
    {
      "hierarchy": "yy",
      "description": "State YY",
      "holidays": [
        {
          "holidayType": "FIXED_DATE",
          "key": "MARTINS_DAY",
          "month": "NOVEMBER",
          "day": 11
        }
      ]
    }
  ]
}
```

A configuration file contains one single Hierarchy, the root hierarchy, which is typically a country.
A Hierarchy has the following properties:

| Property    | Mandatory | Default   | Description |
| ---------   | :-------: | --------- | ------- |
| hierarchy   | yes       |           | a short code for the configuration. The hierarchy for the root entry MUST be the same as the filename |
| description | yes       |           | description of the hierarchy |
| holidays    | yes       |           | an array of holiday definitions |
| subConfigurations | no  |           | an array of sub-configurations, which each by itselve is a valid hierarchy. There is no limitation on the depth of sub-configurations. |

## Holiday definition
The Holiday definition contains all required information to calculate the date of the holiday for a given year.
Common properties for all holiday definitions:

| Property    | Mandatory | Default   | Description |
| ---------   | :-------: | --------- | ------- |
| holidayType | yes       |           | The type of holiday |
| key         | yes       |           | see below |
| category    | no        | OFFICIAL_HOLIDAY | see below |
| cycle       | no        | EVERY_YEAR | see below |
| validFrom   | no        |           | The first year of occurrence |
| validTo     | no        |           | The last year of occurrence |
| moves       | no        |           | An array of moving conditions. [Details](/docs/configuration/move.md) |

### [Types of holidays](https://github.com/jbouduin/holiday/blob/master/packages/holidays-lib/src/configuration/types/holiday-type.ts)
The holidayType is **case sensitive**.

| Enum value             | Details                                                  |
| ---------------------- | -------------------------------------------------------- |
| CHRISTIAN              | [Details](/docs/configuration/christian.md)              |
| ETHIOPIAN_ORTHODOX     | [Details](/docs/configuration/ethiopian-orthodox.md)     |
| FIXED_DATE             | [Details](/docs/configuration/fixed-date.md)             |
| FIXED_WEEKDAY          | [Details](/docs/configuration/fixed-weekday.md)          |
| HEBREW                 | [Details](/docs/configuration/hebrew.md)                 |
| ISLAMIC                | [Details](/docs/configuration/islamic.md)                |
| RELATIVE_BETWEEN_FIXED | [Details](/docs/configuration/relative-between-fixed.md) |
| RELATIVE_TO_DATE       | [Details](/docs/configuration/relative-to-date.md)       |
| RELATIVE_TO_WEEKDAY    | [Details](/docs/configuration/relative-to-weekday.md)    |


### Key
The key of the holiday can be seen as the **ID** of a holiday. For the religious holidays the values of the keys are restricted and **case-sensitive**.
The key is also used for translating the description of a holiday.
Remark: some Christian holidays appear more then once in the list of keys. This is by design, as they should be translated differently. e.g. the Christian holidays MARDI_GRAS and CARNIVAL occur on the same day (i.c. 47 days before Easter Sunday), but they are named differently.

### [Holiday category](https://github.com/jbouduin/holiday/blob/master/packages/holidays-lib/src/configuration/types/category.ts)

The category is **case sensitive**.

| Enum value             | Details |
| ---------------------- | ------- |
| OFFICIAL_HOLIDAY       |         |
| UNOFFICIAL_HOLIDAY     |         |

### [Holiday cycle](https://github.com/jbouduin/holiday/blob/master/packages/holidays-lib/src/configuration/types/cycle.ts)

The cycle is **case sensitive**.

| Enum value | Remark                                      |
| ---------- | ------------------------------------------- |
| TWO_YEARS  | Requires the _validFrom_ property to be set |
| FOUR_YEARS | Requires the _validFrom_ property to be set |
| FIVE_YEARS | Requires the _validFrom_ property to be set |
| SIX_YEARS  | Requires the _validFrom_ property to be set |
| EVERY_YEAR |                                             |
| EVEN_YEARS |                                             |
| ODD_YEARS  |                                             |
