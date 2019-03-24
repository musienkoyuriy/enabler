import { hasNonEmptyAttribute } from '../../utils';
import DOMNodesValidator from '../../dom-nodes-validator';

export default function scopeOnlyInCell($: any, content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selectors: ':not(th)',
    assocAttrs: ['scope'],
    isInvalid: (elem: CheerioElement, attrs?: string[]) => attrs ? hasNonEmptyAttribute($(elem), attrs) : false,
    warningMessage: '"scope" attribute can only be applied to <th> element'
  });
}
