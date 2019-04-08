const { roles } = require('aria-query');
import DOMNodesValidator from '../../dom-nodes-validator';
import { getAttrValue, hasAttribute } from '../../utils';

export default function rolesAreValid($: any, content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selector: '*',
    assocAttrs: ['role'],
    isInvalid: (elem: CheerioElement, attrs?: string[]) => {
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
