import DOMNodesValidator from '../dom-nodes-validator';
import WholeTemplateValidator from '../whole-template-validator';
import { RuleData } from './rule';

export interface DOMNodesValidatorOptions {
  isInvalid: (rule: RuleData) => boolean;
  selector: string[] | string;
  warningMessage: string | ((el: CheerioElement) => string);
  assocAttrs?: string[];
  assocEvents?: string[];
}

export type DOMNodesValidatorFactory = (
  $: CheerioOptionsInterface
) => DOMNodesValidator;
export type WholeValidatorFactory = (
  $: CheerioOptionsInterface
) => WholeTemplateValidator;
