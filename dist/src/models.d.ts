export interface IValidatorOptions {
    isInvalid: Function;
    selectors: string[] | string;
    $template: any;
    warningMessage: string | ((el: any) => string);
    content: string;
    assocAttrs?: string[];
    assocEvents?: string[];
}
export interface IWarning {
    message: string;
    line: number;
}
export interface ProgramOptions {
    ng?: boolean;
    vue?: boolean;
}
