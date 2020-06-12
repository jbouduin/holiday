# Relative to date holidays

## holiday definition

### Properties

| Property    | Mandatory | Default   | Description |
| ---------   | :-------: | --------- | ------- |
| holidayType | yes       |           | must be: RELATIVE_TO_DATE |
| key         | yes       |           | |

### Sample

```json
{
  "holidayType": "RELATIVE_TO_DATE",
  "key": "RECONCILIATION",
  "relation": {
    "which": "FIRST",
    "weekday": "MONDAY",
    "when": "AFTER"
  },
  "fix": {
    "month": "MAY",
    "day": 26
  },
  "validFrom": 2020
}
```
