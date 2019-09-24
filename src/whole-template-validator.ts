import { Warning } from './models/warnings';

interface ValidatorOptions {
  loadedTemplate: Cheerio;
  isInvalid: () => boolean;
  warningMessage: string;
}
export default class WholeTemplateValidator {
  // @ts-ignore
  //tslint:disable
  _warnings: Warning[] = [];
  constructor(options: ValidatorOptions) {
    if (options.isInvalid()) {
      this._warnings = [
        ...this._warnings,
        {
          message: options.warningMessage
        }
      ]
    }
  }
  get warnings(): Warning[] {
    return this._warnings;
  }
}
