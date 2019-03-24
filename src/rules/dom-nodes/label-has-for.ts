import { hasNonEmptyAttribute } from '../../utils';
import DOMNodesValidator from '../../dom-nodes-validator';

export default function labelHasFor($: any, content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selectors: 'label',
    assocAttrs: ['for'],
    isInvalid: (elem: CheerioElement, attrs?: string[]) => attrs ? !hasNonEmptyAttribute($(elem), attrs) : false,
    warningMessage: '"for" attribute is missing in "label".'
  });
}
