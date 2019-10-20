import { RuleData } from './../../models/rule';
import DOMNodesValidator from '../../dom-nodes-validator';
import { getAttrValue } from '../../utils';

export default function linksHasUrl($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: 'a',
    assocAttrs: ['href'],
    isInvalid: (rule: RuleData) => {
      const { elem, attrs } = rule;
      const href = attrs ? getAttrValue($(elem), attrs) : '';
      const hasUrl = href !== '' && href !== '#';

      return !hasUrl;
    },
    warningMessage: 'Specify URL for link.'
  });
}
