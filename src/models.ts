export interface IValidatorOptions {
  isInvalid: (elem: any, attrs: string[], events: string[]) => boolean;
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
