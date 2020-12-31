# Fixed-date holidays
Fixed date holidays are holidays that occur on a fixed day in the year.

**CAVEAT**: also religious holidays that have a fixed date belong to this holiday type. (e.g. Christmas)

## holiday definition
### Properties

| Property    | Mandatory | Default   | Description         |
| ---------   | :-------: | --------- | ------------------- |
| holidayType | yes       |           | must be: FIXED_DATE |
| key         | yes       |           |                     |
| month       | yes       |           |                     |
| day         | yes       |           |                     |

### Example

```json
{
  "holidayType": "FIXED_DATE",
  "key": "NEW_YEAR",
  "month": "JANUARY",
  "day": 1
}
```
