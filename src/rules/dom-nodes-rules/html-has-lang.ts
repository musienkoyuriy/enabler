import { RuleData } from './../../models/rule';
import DOMNodesValidator from '../../dom-nodes-validator';
import { hasNonEmptyAttribute } from '../../utils';

export default function htmlHasLang($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: 'html',
    assocAttrs: ['lang'],
    isInvalid: (rule: RuleData) =>  rule.attrs ? !hasNonEmptyAttribute($(rule.elem), rule.attrs) : false,
    warningMessage: '<html> element should have "lang" attribute.'
  });
}
