# @jbouduin/holidays

[![Travis (.com)](https://img.shields.io/travis/jbouduin/holiday)](https://travis-ci.com/github/jbouduin/holiday)
[![Coverage Status](https://coveralls.io/repos/github/jbouduin/holiday/badge.svg?branch=master)](https://coveralls.io/github/jbouduin/holiday?branch=master)
[![Open issues](https://img.shields.io/github/issues/jbouduin/holiday)](https://github.com/jbouduin/holiday/issues)
[![license](https://img.shields.io/github/license/jbouduin/holiday)](/LICENSE)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

This library gives you a list of holidays for a given year and location. The definitions for calculating the holidays are stored in [configuration files](/docs/configuration/configuration.md).

The original idea comes from [Jollyday](https://github.com/svendiedrichsen/jollyday), a Java project offering the same functionality.

## Status
Following [types of holidays](https://github.com/jbouduin/holiday/blob/master/packages/holidays-lib/src/configuration/types/holiday-type.ts) are planned/implemented

| Enum value             | Description                                              | Implementation status |
| ---------------------- | -------------------------------------------------------- | :-------------------: |
| CHRISTIAN              | [Details](/docs/configuration/christian.md)              | :white_check_mark:    |
| ETHIOPIAN_ORTHODOX     | [Details](/docs/configuration/ethiopian-orthodox.md)     | :x:                   |
| FIXED_DATE             | [Details](/docs/configuration/fixed-date.md)             | :white_check_mark:    |
| FIXED_WEEKDAY          | [Details](/docs/configuration/fixed-weekday.md)          | :white_check_mark:    |
| HEBREW                 | [Details](/docs/configuration/hebrew.md)                 | :x:                   |
| ISLAMIC                | [Details](/docs/configuration/islamic.md)                | :x:                   |
| RELATIVE_BETWEEN_FIXED | [Details](/docs/configuration/relative-between-fixed.md) | :white_check_mark:    |
| RELATIVE_TO_DATE       | [Details](/docs/configuration/relative-to-date.md)       | :white_check_mark:    |
| RELATIVE_TO_WEEKDAY    | [Details](/docs/configuration/relative-to-weekday.md)    | :white_check_mark:    |

## Demo Site
Source: [holiday-site](https://github.jbouduin/holiday-site)

Demo: [here](https://jbouduin.github.io/holiday-site/)

![demo](/docs/images/demo.jpg)

## Demo Service Implementation
Source [holiday-server](https://github.com/jbouduin/holiday-server)

![call](/docs/images/api-server.jpg)

## Contributing
If you find a bug, have a great idea, can translate the resources, or discovered missing or wrong holiday definitions, you can
- [create an issue](https://github.com/jbouduin/holiday/issues/new/choose)
- correct/implement yourself and create a pull request. If you write code, please have a look at the [coding-guidelines](/docs/contributing/coding-guidelines.md)
