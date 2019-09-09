import { ariaAttributes } from '../../constants';
import DOMNodesValidator from '../../dom-nodes-validator';

export default function ariaUnsupportedElements($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: [
      'meta',
      'html',
      'script',
      'style'
    ],
    assocAttrs: ariaAttributes,
    isInvalid: (elem: CheerioElement, attrs?: string[]) => {
      const attributes = $(elem).attr();

      return attrs ? attrs.some(attr => attr in attributes) : false;
    },
    warningMessage: 'Hidden elements shouldn\'t contains aria- attributes.'
  });
}
