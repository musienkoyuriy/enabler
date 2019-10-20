import { RuleData } from './rule';
import DOMNodesValidator from '../dom-nodes-validator';
import WholeTemplateValidator from '../whole-template-validator';

export interface DOMNodesValidatorOptions {
  isInvalid: (rule: RuleData) => boolean;
  selector: string[] | string;
  warningMessage: string | ((el: Cheerio) => string);
  assocAttrs?: string[];
  assocEvents?: string[];
}

export type DOMNodesValidatorFactory = ($: CheerioOptionsInterface) => DOMNodesValidator;
export type WholeValidatorFactory = ($: CheerioOptionsInterface) => WholeTemplateValidator;
