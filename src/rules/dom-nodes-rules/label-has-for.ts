import DOMNodesValidator from '../../dom-nodes-validator';
import { hasNonEmptyAttribute } from '../../utils';

export default function labelHasFor($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: 'label',
    assocAttrs: ['for'],
    isInvalid: (elem: CheerioElement, attrs?: string[]) => attrs ? !hasNonEmptyAttribute($(elem), attrs) : false,
    warningMessage: '"for" attribute is missing in "label".'
  });
}
