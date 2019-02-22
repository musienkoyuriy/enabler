import Validator from '../validator';
import { ProgramOptions } from './common';

export interface ValidatorOptions {
  isInvalid: ($elem: Cheerio, attrs?: string[], events?: string[]) => boolean;
  selectors: string[] | string;
  $template: any;
  warningMessage: string | ((el: Cheerio) => string);
  content: string;
  assocAttrs?: string[];
  assocEvents?: string[];
  solve?: (el: Cheerio) => void;
}

export type ValidatorFactory = ($: any, content: string, options: ProgramOptions) => Validator;
