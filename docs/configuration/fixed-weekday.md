# Fixed-weekday holidays
Fixed weekday holidays are holidays that occur on a fixed weekday during the year.

## holiday definition

### Properties

| Property    | Mandatory | Default   | Description |
| ---------   | :-------: | --------- | ------- |
| holidayType | yes       |           | must be: FIXED_WEEKDAY|
| key         | yes       |           | |
| which       ||||
| weekday     ||||
| month       ||||

### Example
```json
{
  "holidayType": "FIXED_WEEKDAY",
  "key": "THANKSGIVING",
  "which": "FOURTH",
  "weekday": "THURSDAY",
  "month": "NOVEMBER",
  "validFrom": 1863
}
```
