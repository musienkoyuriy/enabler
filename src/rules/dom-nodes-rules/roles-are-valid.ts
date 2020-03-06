const { roles } = require('aria-query');
import DOMNodesValidator from '../../dom-nodes-validator';
import { getAttrValue, hasAttribute } from '../../utils';
import { RuleData } from './../../models/rule';

export default function rolesAreValid($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: '*',
    assocAttrs: ['role'],
    isInvalid: (rule: RuleData) => {
      const { elem, attrs } = rule;
      if (attrs && hasAttribute($(elem), attrs)) {
        const roleValue = getAttrValue($(elem), attrs);
        const validRoles = Array.from(roles.keys());

        return !validRoles.includes(roleValue);
      }
      return false;
    },
    warningMessage: 'Specify a valid non-empty "role" attribute.'
  });
}
