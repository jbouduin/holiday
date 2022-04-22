# @jbouduin/holidays

This is a wrapper around `@jbouduin/holidays-lib`, using http calls (Axios) to fetch the configuration files.

## Usage

Using the default language (en):
```typescript
// instantiate the wrapper
const holidays = new HolidaysHttp('https://jbouduin.github.io/holiday-site/', 'assets/holidays');
// retrieve the supported languages
const supportedLanguages = await holidays.getSupportedLanguages();
// retrieve retrieve the hierarchies
const hierarchies = await holidays.getHierarchyTree();
// retrieve the holidays in 2022 for a munich in bavaria in germany
const holidaysForMunich = await holidays.getHolidays('de/by/mu', 2022, false);
// retrieve the holidays in 2022 for bavaria in germany, including all local holidays
const holidaysForBavaria = await holidays.getHolidays('de/by', 2022, true);
// retrieve the holidays in 2022 for germany, leaving out all regional and local holidays
const holidaysForGermany = await holidays.getHolidays('de', 2022, false);
```

In order to retrieve the data in another language (e.g. German), use the language parameter when instantiating Holidays:
```typescript
const holidays = new Holidays('https://jbouduin.github.io/holiday-site/', 'assets/holidays', 'de');
```

A sample implementation can be found [here](https://github.com/jbouduin/holiday-server)

## Prerequisites
The implementation of the file provider expects a directory structure like this below the assetsroot on the host.

```text
│   configurations.json
│   languages.json
├───configurations
│       ae.json
│       ...
│       za.json
└───translations
        hierarchy.de.json
        hierarchy.en.json
        hierarchy.fr.json
        hierarchy.json
        hierarchy.nl.json
        hierarchy.pt.json
        holiday.de.json
        holiday.en.json
        holiday.fr.json
        holiday.json
        holiday.nl.json
        holiday.pt.json
        holiday.sv.json
```