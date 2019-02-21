import Validator from './validator';

export interface ValidatorOptions {
  isInvalid: ($elem: Cheerio, attrs?: string[], events?: string[]) => boolean;
  selectors: string[] | string;
  $template: any;
  warningMessage: string | ((el: any) => string);
  content: string;
  assocAttrs?: string[];
  assocEvents?: string[];
}

export type ValidatorFactory = ($: any, content: string, options: ProgramOptions) => Validator;
export type TemplatesWithWarnings = {[key: string]: Warning[]};

export interface Warning {
  message: string;
  line: number;
}

export interface ProgramOptions {
  ng?: boolean;
  vue?: boolean;
}

export interface EventPair {
  mouse?: string;
  keyboard?: string;
}
