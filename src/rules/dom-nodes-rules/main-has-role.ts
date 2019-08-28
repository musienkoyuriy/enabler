import DOMNodesValidator from '../../dom-nodes-validator';
import { getAttrValue } from '../../utils';

export default function mainHasRole($: any, content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selector: 'main',
    assocAttrs: ['role'],
    isInvalid: (elem: CheerioElement, attrs?: string[]) => {
      const roleValue = attrs ? getAttrValue($(elem), attrs) : '';
      return roleValue !== 'main';
    },
    warningMessage: '<main> element should have an appropriate "role" attribute (role="main")'
  });
}
