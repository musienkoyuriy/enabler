import DOMNodesValidator from '../../dom-nodes-validator';
import { hasNonEmptyAttribute } from '../../utils';

export default function htmlHasLang($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: 'html',
    assocAttrs: ['lang'],
    isInvalid: (elem: CheerioElement, attrs?: string[]) => attrs ? !hasNonEmptyAttribute($(elem), attrs) : false,
    warningMessage: '<html> element should have "lang" attribute.'
  });
}
