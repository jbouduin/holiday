import * as fs from 'fs';
import * as glob from 'glob';
import * as convert from 'xml-js';
import * as commandLineArgs from 'command-line-args';

class Main {

  private unknownKey = '__UNKNOWN__';
  private params: any;
  private commandLineOptions = [
    { name: 'input', alias: 'i', type: String },
    { name: 'output', alias: 'o', type: String }
  ];

  // <editor-fold desc='Main method'>
  public execute(args: Array<any>) {
    let cnt = 0;
    try {
      this.params = commandLineArgs(this.commandLineOptions);
    } catch(error) {
      console.log(error);
      return
    }

    const pattern = `${this.params.input}/*.xml`;
    const files = glob(
      pattern,
      (err: Error | null, files: Array<string>) => {
        if (err) {
          console.log(err);
        }
        cnt++;
        files.forEach( (file: any) => {
          this.convertFile(file, this.params.output);
          cnt++;
          console.log(file);
        });
        console.log(`converted ${cnt} files`);
      }
    );
  }
  // </editor-fold>

  // <editor-fold desc='XML-JSON execution'>
  private convertFile(fileName: string, outputDir: string) {
    var options = {
      compact: true,
      spaces: 2,
      elementNameFn: this.convertElementNames,
      attributeNameFn:	this.convertAttributeNames
    }
    const fileAsText: string = fs.readFileSync(fileName, 'utf-8');
    const asString = convert.xml2json(fileAsText, options);

    const configuration = JSON.parse(asString);
    try {
      const json = this.processConfiguration(configuration.configuration);
      fs.writeFile(`${outputDir}/${json.hierarchy.replace('_', '-')}.json`, JSON.stringify(json, null, 2), (err) => {} );
    } catch(error) {
      console.log(fileName, error.message);
    }

  }
  private convertAttributeNames(value: string, parentElement: any) {
    if (value === 'descriptionPropertiesKey') {
      return 'key';
    }
    return value;
  }

  private convertElementNames(value: string, parentElement: any) {
    return value.replace('tns:', '').toLowerCase();
  }
  // </editor-fold>

  // <editor-fold desc='Processing a configuration recursively'>
  private processConfiguration(configuration: any): any {
    // console.log('processing', JSON.stringify(configuration, null, 2));
    const holidays = new Array<any>();

    if (configuration.holidays.christianholiday) {
      if (Array.isArray(configuration.holidays.christianholiday)) {
        configuration.holidays.christianholiday.forEach( (holiday: any) => holidays.push(this.processChristian(holiday)));
      } else {
        holidays.push(this.processChristian(configuration.holidays.christianholiday));
      }
      delete configuration.holidays.christianholiday;
    }

    if (configuration.holidays.fixed) {
      if (Array.isArray(configuration.holidays.fixed)){
        configuration.holidays.fixed.forEach( (holiday: any) => holidays.push(this.processFixed(holiday)));
      } else {
        holidays.push(this.processFixed(configuration.holidays.fixed))
      }
      delete configuration.holidays.fixed;
    }

    if (configuration.holidays.fixedweekday) {
      if (Array.isArray(configuration.holidays.fixedweekday)){
        configuration.holidays.fixedweekday.forEach( (holiday: any) => holidays.push(this.processFixedWeekday(holiday)));
      } else {
        holidays.push(this.processFixedWeekday(configuration.holidays.fixedweekday))
      }
      delete configuration.holidays.fixedweekday;
    }

    if (configuration.holidays.ethiopianorthodoxholiday) {
      if (Array.isArray(configuration.holidays.ethiopianorthodoxholiday)) {
        configuration.holidays.ethiopianorthodoxholiday.forEach( (holiday: any) => holidays.push(this.processEthiopianorthodox(holiday)));
      } else {
        holidays.push(this.processEthiopianorthodox(configuration.holidays.ethiopianorthodoxholiday))
      }
      delete configuration.holidays.ethiopianorthodoxholiday;
    }

    if (configuration.holidays.fixedweekdaybetweenfixed) {
      if (Array.isArray(configuration.holidays.fixedweekdaybetweenfixed)) {
        configuration.holidays.fixedweekdaybetweenfixed.forEach( (holiday: any) => holidays.push(this.processFixedweekdaybetweenfixed(holiday)));
      } else {
        holidays.push(this.processFixedweekdaybetweenfixed(configuration.holidays.fixedweekdaybetweenfixed))
      }
      delete configuration.holidays.fixedweekdaybetweenfixed;
    }

    if (configuration.holidays.islamicholiday) {
      if (Array.isArray(configuration.holidays.islamicholiday)) {
        configuration.holidays.islamicholiday.forEach( (holiday: any) => holidays.push(this.processIslamic(holiday)));
      } else {
        holidays.push(this.processIslamic(configuration.holidays.islamicholiday))
      }
      delete configuration.holidays.islamicholiday;
    }

    if (configuration.holidays.fixedweekdayrelativetofixed) {
      if (Array.isArray(configuration.holidays.fixedweekdayrelativetofixed)) {
        configuration.holidays.fixedweekdayrelativetofixed.forEach( (holiday: any) => holidays.push(this.processFixedweekdayrelativetofixed(holiday)));
      } else {
        holidays.push(this.processFixedweekdayrelativetofixed(configuration.holidays.fixedweekdayrelativetofixed))
      }
      delete configuration.holidays.fixedweekdayrelativetofixed;
    }

    if (configuration.holidays.relativetofixed) {
      if (Array.isArray(configuration.holidays.relativetofixed)) {
        configuration.holidays.relativetofixed.forEach( (holiday: any) => holidays.push(this.processRelativetofixed(holiday)));
      } else {
        holidays.push(this.processRelativetofixed(configuration.holidays.relativetofixed))
      }
      delete configuration.holidays.relativetofixed;
    }
    const leftOver = JSON.stringify(configuration.holidays);

    if (leftOver !== '{}') {
      throw new Error(`unprocessed content: ${leftOver}`);
    }
    let subConfigurations!: Array<any>;
    if (configuration.subconfigurations) {
      subConfigurations = new Array<any>();
      if (Array.isArray(configuration.subconfigurations)) {
        configuration.subconfigurations.forEach( (sub: any) => subConfigurations.push(this.processConfiguration(sub)));
      } else {
        subConfigurations.push(this.processConfiguration(configuration.subconfigurations));
      }
    }
    return {
      hierarchy: configuration._attributes.hierarchy,
      description: configuration._attributes.description || configuration._attributes.hierarchy,
      holidayCollection: holidays,
      subConfigurations: subConfigurations
    };
  }
  // </editor-fold>

  // <editor-fold desc='Holiday specific processing'>
  private processFixed(obj:any): any {
    let moves: Array<any> | undefined = undefined;
    if (obj.movingcondition) {
      moves = this.processMovingConditions(obj.movingcondition)
    }

    return {
      holidayType: "FIXED_DATE",
      key: obj._attributes.key || this.unknownKey,
      month: obj._attributes.month,
      day: Number(obj._attributes.day),
      localizedType: obj._attributes.localizedType,
      validFrom: obj._attributes.validFrom ? Number(obj._attributes.validFrom) : undefined,
      validTo: obj._attributes.validTo ? Number(obj._attributes.validTo) : undefined,
      moves: moves
    };
  }

  private processFixedWeekday(obj:any): any {
    let moves: Array<any> | undefined = undefined;
    if (obj.movingcondition) {
      moves = this.processMovingConditions(obj.movingcondition)
    }

    return {
      holidayType: "FIXED_WEEKDAY",
      key: obj._attributes.key || this.unknownKey,
      which: obj._attributes.which,
      weekday: obj._attributes.weekday,
      month: obj._attributes.month,
      localizedType: obj._attributes.localizedType,
      validFrom: obj._attributes.validFrom ? Number(obj._attributes.validFrom) : undefined,
      validTo: obj._attributes.validTo ? Number(obj._attributes.validTo) : undefined,
      moves: moves
    }
  }

  private processChristian(obj:any): any {
    let moves: Array<any> | undefined = undefined;
    if (obj.movingcondition) {
      moves = this.processMovingConditions(obj.movingcondition)
    }

    return {
      holidayType: "CHRISTIAN",
      type: obj._attributes.type,
      chronology: obj._attributes.chronology,
      localizedType: obj._attributes.localizedType,
      validFrom: obj._attributes.validFrom ? Number(obj._attributes.validFrom) : undefined,
      validTo: obj._attributes.validTo ? Number(obj._attributes.validTo) : undefined,
      moves: moves
    };
  }

  private processIslamic(obj:any): any {
    let moves: Array<any> | undefined = undefined;
    if (obj.movingcondition) {
      moves = this.processMovingConditions(obj.movingcondition)
    }

    return {
      holidayType: "ISLAMIC",
      type: obj._attributes.type,
      localizedType: obj._attributes.localizedType,
      validFrom: obj._attributes.validFrom ? Number(obj._attributes.validFrom) : undefined,
      validTo: obj._attributes.validTo ? Number(obj._attributes.validTo) : undefined,
      moves: moves
    };
  }

  private processEthiopianorthodox(obj:any): any {
    let moves: Array<any> | undefined = undefined;
    if (obj.movingcondition) {
      moves = this.processMovingConditions(obj.movingcondition)
    }

    return {
      holidayType: "ETHIOPIAN_ORTHODOX",
      type: obj._attributes.type,
      localizedType: obj._attributes.localizedType,
      validFrom: obj._attributes.validFrom ? Number(obj._attributes.validFrom) : undefined,
      validTo: obj._attributes.validTo ? Number(obj._attributes.validTo) : undefined,
      moves: moves
    };
  }

  private processFixedweekdaybetweenfixed(obj: any): any {
    let moves: Array<any> | undefined = undefined;
    if (obj.movingcondition) {
      moves = this.processMovingConditions(obj.movingcondition)
    }

    return {
      holidayType: "RELATIVE_BETWEEN_FIXED",
      key: obj._attributes.key || this.unknownKey,
      relation: { "weekday": obj._attributes.weekday },
			fix: {
        from: {
          month: obj.from._attributes.month,
          day: Number(obj.from._attributes.day)
        },
			  to: {
          month: obj.to._attributes.month,
          day: Number(obj.to._attributes.day)
        }
		  },
      localizedType: obj._attributes.localizedType,
      validFrom: obj._attributes.validFrom ? Number(obj._attributes.validFrom) : undefined,
      validTo: obj._attributes.validTo ? Number(obj._attributes.validTo) : undefined,
      moves: moves
    };
  }

  private processFixedweekdayrelativetofixed(obj: any): any {
    let moves: Array<any> | undefined = undefined;
    if (obj.movingcondition) {
      moves = this.processMovingConditions(obj.movingcondition)
    }

    return {
      holidayType: "RELATIVE_TO_DATE",
      key: obj._attributes.key || this.unknownKey,
      relation: {
        which: obj._attributes.which,
        weekday: obj._attributes.weekday,
        when: obj._attributes.when },
			fix: {
        month: obj.day._attributes.month,
        day: Number(obj.day._attributes.day)
      },
      localizedType: obj._attributes.localizedType,
      validFrom: obj._attributes.validFrom ? Number(obj._attributes.validFrom) : undefined,
      validTo: obj._attributes.validTo ? Number(obj._attributes.validTo) : undefined,
      moves: moves
    }
  }

  private processRelativetofixed(obj: any): any {
    let moves: Array<any> | undefined = undefined;
    if (obj.movingcondition) {
      moves = this.processMovingConditions(obj.movingcondition)
    }
    // console.log(JSON.stringify(obj, null, 2));
    // {"_attributes":
    //   { "key":"VICTORIA_DAY" },
    //   "weekday": { "_text":"MONDAY"},"when":{"_text":"BEFORE"},"date":{"_attributes":{"month":"MAY","day":"24"}}}}
    return {
      holidayType: "RELATIVE_TO_DATE",
      key: obj._attributes.key || this.unknownKey,
      relation: {
        weekday: obj.weekday._text,
        when: obj.when._text },
			fix: {
        month: obj.date._attributes.month,
        day: Number(obj.date._attributes.day)
      },
      localizedType: obj._attributes.localizedType,
      validFrom: obj._attributes.validFrom ? Number(obj._attributes.validFrom) : undefined,
      validTo: obj._attributes.validTo ? Number(obj._attributes.validTo) : undefined,
      moves: moves
    }
    // {
    //   "holidayType": "RELATIVE_TO_DATE",
    //   "key": "FIRST_DAY_SUMMER",
    //   "relation": { "which": "FIRST", "weekday": "THURSDAY", "when": "AFTER" },
		// 	"fix": { "month": "APRIL", "day": 18 }
    // }
  }
  // </editor-fold>

  // <editor-fold desc='Process moving conditions'>
  private processMovingConditions(obj: any): Array<any> {
    const result = new Array<any>();
    if (Array.isArray(obj)) {
      obj.forEach( (move: any) => result.push(this.processMovingCondition(move)));
    } else {
      result.push(this.processMovingCondition(obj));
    }
    return result;
  }

  private processMovingCondition(obj: any): any {
    return {
      condition: `IS_${obj._attributes.substitute}`,
      moveTo: obj._attributes.with,
      weekday: obj._attributes.weekday
    };
  }
  // </editor-fold>
}

new Main().execute(process.argv);
