import { Warning } from './models/warnings';

export interface ValidatorOptions {
  loadedTemplate: any;
  isInvalid: () => boolean;
  warningMessage: string;
}
export default class WholeTemplateValidator {
  private _warnings: Warning[] = [];
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
