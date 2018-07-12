import { IValidatorOptions, IWarning } from './models';
export default class Validator implements IValidatorOptions {
    isInvalid: Function;
    selectors: string[] | string;
    $template: any;
    warnings: IWarning[];
    warningMessage: string | ((el: any) => string);
    content: string;
    assocAttrs: string[];
    assocEvents: string[];
    constructor(options: IValidatorOptions);
    getWarnings(): {
        warnings: IWarning[];
    };
    private _normalizeSelectors;
    private _addWarning;
}
