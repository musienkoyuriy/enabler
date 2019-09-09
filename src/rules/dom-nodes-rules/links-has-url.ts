import DOMNodesValidator from '../../dom-nodes-validator';
import { getAttrValue } from '../../utils';

export default function linksHasUrl($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: 'a',
    assocAttrs: ['href'],
    isInvalid: (elem: CheerioElement, attrs?: string[]) => {
      const href = attrs ? getAttrValue($(elem), attrs) : '';
      const hasUrl = href !== '' && href !== '#';

      return !hasUrl;
    },
    warningMessage: 'Specify URL for link.'
  });
}
