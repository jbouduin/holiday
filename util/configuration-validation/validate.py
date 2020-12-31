import json
import getopt
import glob
import os
import sys

from jsonschema import Draft7Validator, RefResolver, SchemaError, ValidationError, validate
from urllib.parse import urljoin
from pathlib import Path


def checkFileExists(fileName):
    if os.path.exists(fileName):
        return True
    else:
        print('file', fileName, 'not found')
        return False
# end checkFileExists


def loadJSONFile(filename):
    data = None
    with open(filename, encoding="utf8") as file:
        try:
            data = json.load(file)
        except json.decoder.JSONDecodeError as e:
            print(filename, 'is not a valid JSON file')
            print(e.msg)

    return data
# end loadJSONFile


def addLocalSchemasToResolver(resolver, schemaFolder, baseUri, schemaExtension='.schema.json'):
    print('Schemafolder', schemaFolder)
    print('BaseUri', baseUri)
    for dir, _, files in os.walk(schemaFolder):
        for file in files:
            if file.endswith(schemaExtension):
                schemaPath = Path(dir) / Path(file)
                relativePath = schemaPath
                relativePath = schemaPath.relative_to(schemaFolder)
                with open(schemaPath) as schemaFile:
                    try:
                        schemaJson = json.load(schemaFile)
                        key = urljoin(baseUri, str(relativePath)
                                      ).replace(schemaExtension, '')
                        print('added key:', key, 'Path:', relativePath)
                        resolver.store[key] = schemaJson
                    except json.decoder.JSONDecodeError as de:
                        print('Error reading schema', file)
                        print(de)
                    # try except
                # end with
            # end if
        # end for
    # end for
    return True
# end


def process(schemaFile, jsonFile):

    schema = loadJSONFile(schemaFile)
    schemaPath = Path(schemaFile).parent
    if schema is None:
        return False

    files = None
    if os.path.isdir(jsonFile):
        files = glob.glob("{0}/*.json".format(jsonFile))
    else:
        files = [jsonFile]
    print(files)
    # TODO this is not correct,it depends on the folder where you start the script
    # {0}/'.format(schemaPath).replace(os.sep, '/')
    baseUri = 'http://example.com/schemas/'

    resolver = RefResolver(base_uri=baseUri, referrer=schema)
    returnValue = True
    if addLocalSchemasToResolver(resolver, schemaPath, baseUri):
        for f in files:
            try:
                print('Start validation for', f)
                configuration = loadJSONFile(f)
                Draft7Validator.check_schema(schema)
                validate(configuration, schema,
                         Draft7Validator, resolver=resolver)
            except SchemaError as se:
                print('Invalid Schema', se)
                returnValue = False
            except ValidationError as ve:
                print(ve.message)
                print('rule', end=': ')
                cnt = 0
                for elem in ve.absolute_schema_path:
                    if (cnt < len(ve.absolute_schema_path) - 1):
                        print(elem, end=' -> ')
                    else:
                        print(elem, end='')
                    cnt += 1
                # end for
                print()
                print('location', end=': ')
                cnt = 0
                for elem in ve.path:
                    if (cnt < len(ve.path) - 1):
                        print(elem, end=' -> ')
                    else:
                        print(elem, end=' ')
                    cnt += 1
                # end for
                returnValue = False
            # end try
    else:
        returnValue = False
    # end if/else addLocalSchemasToResolver

    # print('validation succeeded')
    return returnValue
# end process


def main():
    # initialize variables
    schemaFile = None
    jsonFiles = None

    usage = 'Usage: validate.py -s schemafile [inputfile | inputDirectory]'
    try:
        opts, args = getopt.getopt(sys.argv[1:], 's:', ['schema='])
    except getopt.GetoptError as e:
        print(e)
        print(usage)
        sys.exit(-1)
    # end try

    for opt, arg in opts:
        if opt == '-h':
            print(usage)
            sys.exit()
        elif opt in ('-s', '--schema'):
            schemaFile = arg
    # end for ...

    if len(args) == 0:
        print("No json file or input directory for validation specified")
        print(usage)
        sys.exit(-1)
    else:
        jsonFiles = args[0]

    if schemaFile is None:
        print("No schema file for validation specified")
        print(usage)
        sys.exit(-1)

    if not checkFileExists(schemaFile) or not checkFileExists(jsonFiles):
        sys.exit(-1)

    if process(schemaFile, jsonFiles):
        sys.exit(0)
    else:
        sys.exit(-1)
# end main


if __name__ == '__main__':
    main()
