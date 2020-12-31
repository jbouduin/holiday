# Relative between fixed holidays

## holiday definition

### Properties

| Property    | Mandatory | Default   | Description |
| ---------   | :-------: | --------- | ------- |
| holidayType | yes       |           | must be: RELATIVE_BETWEEN_FIXED |
| key         | yes       |           | |

### Example

```json
{
  "holidayType": "RELATIVE_BETWEEN_FIXED",
  "key": "HUSBANDS_DAY",
  "relation": {
    "weekday": "FRIDAY"
  },
  "fix": {
    "from": {
      "month": "JANUARY",
      "day": 19
    },
    "to": {
      "month": "JANUARY",
      "day": 25
    }
  }
}
```
