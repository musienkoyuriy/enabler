import { getAttrValue } from '../../utils';
import DOMNodesValidator from '../../dom-nodes-validator';

export default function linksHasUrl($: any,content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selectors: 'a',
    assocAttrs: ['href'],
    isInvalid: (elem: CheerioElement, attrs?: string[]) => {
      const href = attrs ? getAttrValue($(elem), attrs) : '';
      const hasUrl = href !== '' && href !== '#';

      return !hasUrl;
    },
    warningMessage: 'Specify URL for link.'
  });
}
