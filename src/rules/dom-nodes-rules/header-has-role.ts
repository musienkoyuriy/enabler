import DOMNodesValidator from '../../dom-nodes-validator';
import { getAttrValue } from '../../utils';
import { RuleData } from './../../models/rule';

export default function headerHasRole($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: 'header',
    assocAttrs: ['role'],
    isInvalid: (rule: RuleData) => {
      const { elem, attrs } = rule;
      const roleValue = attrs ? getAttrValue($(elem), attrs) : '';
      return roleValue !== 'banner';
    },
    warningMessage:
      '<header> element should have an "role" attribute (role="banner")'
  });
}
