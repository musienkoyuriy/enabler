import { RuleData } from './../../models/rule';
import DOMNodesValidator from '../../dom-nodes-validator';
import { hasNonEmptyAttribute } from '../../utils';

export default function labelHasFor($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: 'label',
    assocAttrs: ['for'],
    isInvalid: (rule: RuleData) => rule.attrs ? !hasNonEmptyAttribute($(rule.elem), rule.attrs) : false,
    warningMessage: '"for" attribute is missing in "label".'
  });
}
