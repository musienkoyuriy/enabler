import DOMNodesValidator from '../../dom-nodes-validator';
import { getAttrValue } from '../../utils';

export default function articleHasRole($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: 'article',
    assocAttrs: ['role'],
    isInvalid: (elem: CheerioElement, attrs?: string[]) => {
      const roleValue = attrs ? getAttrValue($(elem), attrs) : '';
      return roleValue !== 'article';
    },
    warningMessage: '<article> element should have an appropriate "role" attribute (role="article")'
  });
}
