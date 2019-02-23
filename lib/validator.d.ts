import { ValidatorOptions } from './models/validator';
import { Warning } from './models/warnings';
export default class Validator implements ValidatorOptions {
    isInvalid: (template: any, attrs?: string[], events?: string[]) => boolean;
    selectors: string[] | string;
    $template: any;
    warnings: Warning[];
    warningMessage: string | ((el: any) => string);
    content: string;
    assocAttrs: string[];
    assocEvents: string[];
    constructor(options: ValidatorOptions);
    getWarnings(): {
        warnings: Warning[];
    };
    private _normalizeSelectors;
    private _addWarning;
}
