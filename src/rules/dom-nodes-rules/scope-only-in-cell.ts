import DOMNodesValidator from '../../dom-nodes-validator';
import { hasNonEmptyAttribute } from '../../utils';
import { RuleData } from './../../models/rule';

export default function scopeOnlyInCell($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: ':not(th)',
    assocAttrs: ['scope'],
    isInvalid: (rule: RuleData) => {
      const { elem, attrs} = rule;
      return attrs ? hasNonEmptyAttribute($(elem), attrs) : false;
    },
    warningMessage: '"scope" attribute can only be applied to <th> element'
  });
}
