# relative to weekday holidays

## holiday definition

### Properties

| Property    | Mandatory | Default   | Description |
| ---------   | :-------: | --------- | ------- |
| holidayType | yes       |           | must be: RELATIVE_TO_WEEKDAY |
| key         | yes       |           | |

### Example

```json
{
  "holidayType": "RELATIVE_TO_WEEKDAY",
  "key": "ELECTION_DAY",
  "relation": {
    "weekday": "TUESDAY",
    "when": "AFTER"
  },
  "fix": {
    "which": "FIRST",
    "weekday": "MONDAY",
    "month": "NOVEMBER"
  },
  "cycle": "EVEN_YEARS"
}
```
