import DOMNodesValidator from '../dom-nodes-validator';
import WholeTemplateValidator from '../whole-template-validator';

export interface DOMNodesValidatorOptions {
  isInvalid: (elem: CheerioElement, attrs?: string[], events?: string[]) => boolean;
  selectors: string[] | string;
  $template: any;
  warningMessage: string | ((el: Cheerio) => string);
  content: string;
  assocAttrs?: string[];
  assocEvents?: string[];
  solve?: (el: Cheerio) => void;
}

export type DOMNodesValidatorFactory = ($: CheerioOptionsInterface, content: string) => DOMNodesValidator;
export type WholeValidatorFactory = ($: CheerioOptionsInterface) => WholeTemplateValidator;
