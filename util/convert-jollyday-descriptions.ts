import * as fs from 'fs';
import * as readline  from 'readline';
import * as glob from 'glob';

import * as commandLineArgs from 'command-line-args';

class Main {

  // <editor-fold desc='Private properties'>
  private commandLineOptions = [
    { name: 'file', alias: 'f', type: String },
    { name: 'input', alias: 'i', type: String },
    { name: 'output', alias: 'o', type: String }
  ];
  // </editor-fold>

  // <editor-fold desc='Main method'>
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
  // </editor-fold>

  // <editor-fold desc='Private methods'>
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
    const fileStream = fs.createReadStream(fileName, 'utf-8');
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
        result[keyTransformer(split[0])] = split[1];
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

  // </editor-fold>
}


new Main().execute();
