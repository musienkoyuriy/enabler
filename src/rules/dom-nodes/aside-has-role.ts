import DOMNodesValidator from '../../dom-nodes-validator';
import { getAttrValue } from '../../utils';

export default function asideHasRole($: any, content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selectors: 'aside',
    assocAttrs: ['role'],
    isInvalid: (elem: CheerioElement, attrs?: string[]) => {
      const role = attrs ? getAttrValue($(elem), attrs) : '';
      const roleValues = ['note', 'complementary'];

      return !roleValues.includes(role);
    },
    warningMessage: '<aside> element should have an "role" attribute (role="note" or role="complementary ")'
  });
}
