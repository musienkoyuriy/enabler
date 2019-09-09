import DOMNodesValidator from '../../dom-nodes-validator';
import { hasNonEmptyAttribute } from '../../utils';

export default function scopeOnlyInCell($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: ':not(th)',
    assocAttrs: ['scope'],
    isInvalid: (elem: CheerioElement, attrs?: string[]) => attrs ? hasNonEmptyAttribute($(elem), attrs) : false,
    warningMessage: '"scope" attribute can only be applied to <th> element'
  });
}
