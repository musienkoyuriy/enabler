import DOMNodesValidator from '../../dom-nodes-validator';
import { getAttrValue } from '../../utils';

export default function headerHasRole($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: 'header',
    assocAttrs: ['role'],
    isInvalid: (elem: CheerioElement, attrs?: string[]) => {
      const roleValue = attrs ? getAttrValue($(elem), attrs) : '';
      return roleValue !== 'banner';
    },
    warningMessage: '<header> element should have an "role" attribute (role="banner")'
  });
}
