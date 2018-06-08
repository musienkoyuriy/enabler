import { ValidatorOptions, Warning } from './models';
export default class Validator implements ValidatorOptions {
    isInvalid: Function;
    selectors: string[] | string;
    $template: any;
    warnings: Warning[];
    warningMessage: string | Function;
    content: string;
    assocAttrs: string[];
    assocEvents: string[];
    constructor(options: ValidatorOptions);
    _normalizeSelectors(selectors: string | string[]): string;
    _addWarning(el: any): void;
    getWarnings(): {
        warnings: Warning[];
    };
}
