# Description

A simple Phyton script to validate laboratory and customer configuration files.
I did not find any package on npm that supports the complete specifications for jsonschema Draft-07. So for the time being I stick to python.

# Requirements

- Python 3.6+
- Libraries to install (e.g. using pip)
  - jsonschema

# how to run validation
in this directory (this is important) run

`$ validate.py -s schema\hierarchy.schema.json <configurationfile>`

or

`$ validate.py -s schemas\customer\customer.schema.json <inputdirectory>`




