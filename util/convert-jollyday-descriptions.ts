import * as fs from 'fs';
import * as readline  from 'readline';
import * as glob from 'glob';

import * as commandLineArgs from 'command-line-args';
// function utf8Encode(unicodeString: string) {
//     if (typeof unicodeString != 'string') throw new TypeError('parameter ‘unicodeString’ is not a string');
//     const utf8String = unicodeString.replace(
//         /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
//         function(c) {
//           console.log(c);
//             var cc = c.charCodeAt(0);
//             return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f); }
//     ).replace(
//         /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
//         function(c) {
//             var cc = c.charCodeAt(0);
//             console.log(c);
//             return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f); }
//     );
//     return utf8String;
// }

class Main {

  //#region Private properties
  private commandLineOptions = [
    { name: 'file', alias: 'f', type: String },
    { name: 'input', alias: 'i', type: String },
    { name: 'output', alias: 'o', type: String }
  ];
  //#endregion

  //#region Main method
  public execute() {

    let params: any;
    try {
      params = commandLineArgs(this.commandLineOptions);
    } catch(error) {
      console.error(error);
      return
    }

    if (params.file) {
      this.convertFile(params.file, params.output);
    } else if (params.input){
      const pattern = `${params.input}/*.properties`;
      glob(
        pattern,
        (err: Error | null, files: Array<string>) => {
          if (err) {
            console.log(err);
          }
          let cnt = 0;
          files.forEach( (file: any) => {
            this.convertFile(file, params.output);
            cnt++;
            console.log(file);
          });
          console.log(`converted ${cnt} files`);
        }
      );
    } else {
      console.log('invalid args');
    }

  }
  //#endregion

  //#region Private methods
  private convertFile(fullFileName: string, outputDir: string) {
    const fileName = fullFileName.replace(/\\/g, '/').split('/').pop() || '';
    let languageCode: string = fileName.split('.')[0].split('_').pop() || '';
    let outputFileName: string


    if (fileName.startsWith('country_descriptions')) {
      console.log('country');
      if (languageCode === 'descriptions') {
        outputFileName = `${outputDir}/hierarchy.json`;
      } else {
        outputFileName = `${outputDir}/hierarchy.${languageCode}.json`
      }
      this.convert(fullFileName, outputFileName, this.countryKeyTransformer);
    } else if (fileName.startsWith('holiday_descriptions')) {
      if (languageCode === 'descriptions') {
        outputFileName = `${outputDir}/holiday.json`;
      } else {
        outputFileName = `${outputDir}/holiday.${languageCode}.json`
      }
      this.convert(fullFileName, outputFileName, this.holidayKeyTransformer);
    } else {
      console.log('unknown file type', fileName);
    }
  }

  private async convert(fileName: string, outputFile: string, keyTransformer: (key: string) => string) {
    const fileStream = fs.createReadStream(fileName);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    const result: any = { };
    for await (const line of rl) {
      const trimmed = line.trim();
      if (trimmed.length > 0 && !trimmed.startsWith('#'))
      {
        const split = line.split('=').map(entry => entry.trim());
        result[keyTransformer(split[0])] = this.translationTransformer(split[1]);
      }
    }
    console.log(JSON.stringify(result, null, 2));
    fs.writeFile(
      outputFile,
      JSON.stringify(result, null, 2),
      (err) => {
        if (err) {
          console.error('Error:', err);
        }
      }
    );
  }

  private countryKeyTransformer(key: string): string {
    return key.replace('country.description.', '').replace(/\./g, '/');
  }

  private holidayKeyTransformer(key: string): string {
    return key.replace('holiday.description.', '')
      .replace('christian', 'CHRISTIAN')
      .replace('islamic', 'ISLAMIC')
      .replace('ethiopian.orthodox', 'ETHIOPIAN_ORTHODOX');
  }

  private translationTransformer(translation: string): string {
    return translation
      .replace(/\\u00B4/g, '´')
      .replace(/\\u00C1/g, 'Á')
      .replace(/\\u00C2/g, 'Â')
      .replace(/\\u00C4/g, 'Ä')
      .replace(/\\u00C9/g, 'É')
      .replace(/\\u00CD/g, 'Í')
      .replace(/\\u00CE/g, 'Î')
      .replace(/\\u00E0/g, 'à')
      .replace(/\\u00E1/g, 'á')
      .replace(/\\u00E2/g, 'â')
      .replace(/\\u00E3/g, 'ã')
      .replace(/\\u00E4/g, 'ä')
      .replace(/\\u00E6/g, 'æ')
      .replace(/\\u00E7/g, 'ç')
      .replace(/\\u00E8/g, 'è')
      .replace(/\\u00E9/g, 'é')
      .replace(/\\u00EA/g, 'ê')
      .replace(/\\u00EB/g, 'ë')
      .replace(/\\u00ED/g, 'í')
      .replace(/\\u00EE/g, 'î')
      .replace(/\\u00EF/g, 'ï')
      .replace(/\\u00D6/g, 'Ö')
      .replace(/\\u00DF/g, 'ß')
      .replace(/\\u00F5/g, 'õ')
      .replace(/\\u00FB/g, 'û')
      .replace(/\\u00FA/g, 'ú')
      .replace(/\\u00FC/g, 'ü')
      .replace(/\\u00F3/g, 'ó')
      .replace(/\\u00F4/g, 'ô')
      .replace(/\\u00FC/g, 'ü')
      .replace(/\\u00F6/g, 'ö')
      .replace(/\\u0161/g, 'š');
  }
  //#endregion
}


new Main().execute();
