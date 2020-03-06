import DOMNodesValidator from '../../dom-nodes-validator';
import { hasNonEmptyAttribute } from '../../utils';
import { RuleData } from './../../models/rule';

export default function iFrameHasTitle($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: 'iframe',
    assocAttrs: ['title'],
    isInvalid: (rule: RuleData) =>
      rule.attrs ? !hasNonEmptyAttribute($(rule.elem), rule.attrs) : false,
    warningMessage:
      '<iframe> element should have a unique non-empty title attribute'
  });
}
