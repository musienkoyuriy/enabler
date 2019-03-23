const { roles } = require('aria-query');
import { getAttrValue, hasAttribute } from '../../utils';
import DOMNodesValidator from '../../validator';

export default function rolesAreValid($: any, content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selectors: '*',
    assocAttrs: ['role'],
    isInvalid: ($elem: any, attrs?: string[]) => {
      if (attrs && hasAttribute($elem, attrs)) {
        const roleValue = getAttrValue($elem, attrs);
        const validRoles = Array.from(roles.keys());

        return !validRoles.includes(roleValue);
      }
      return false;
    },
    warningMessage: 'Specify a valid non-empty "role" attribute.'
  });
}