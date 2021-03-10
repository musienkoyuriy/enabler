import DOMNodesValidator from '../dom-nodes-validator';
import WholeTemplateValidator from '../whole-template-validator';
import { RuleData } from './rule';

export interface DOMNodesValidatorOptions {
  isInvalid: (rule: RuleData) => boolean;
  selector: string[] | string;
  warningMessage: string | ((el: any) => string);
  assocAttrs?: string[];
  assocEvents?: string[];
}

export type DOMNodesValidatorFactory = (
  $: any
) => DOMNodesValidator;
export type WholeValidatorFactory = (
  $: any
) => WholeTemplateValidator;
