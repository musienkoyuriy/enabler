export interface ValidatorOptions {
  isInvalid: Function;
  selectors: string[] | string;
  $template: any;
  warningMessage: string | Function;
  content: string;
  assocAttrs?: string[];
  assocEvents?: string[];
}

export interface Warning {
  message: string;
  line: number;
}
