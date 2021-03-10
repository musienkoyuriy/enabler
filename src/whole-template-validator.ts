import { Warning } from './models/warnings';

export interface ValidatorOptions {
  loadedTemplate: any;
  isInvalid: () => boolean;
  warningMessage: string;
}
export default class WholeTemplateValidator {
  // @ts-ignore
  //tslint:disable
  _warnings: Warning[] = [];
  constructor(public options: ValidatorOptions) {
    if (options.isInvalid()) {
      this._warnings = [
        ...this._warnings,
        {
          message: options.warningMessage
        }
      ];
    }
  }
  get warnings(): Warning[] {
    return this._warnings;
  }
}
