import DOMNodesValidator from '../../dom-nodes-validator';
import { hasNonEmptyAttribute } from '../../utils';

export default function htmlHasLang($: any, content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selector: 'html',
    assocAttrs: ['lang'],
    isInvalid: (elem: CheerioElement, attrs?: string[]) => attrs ? !hasNonEmptyAttribute($(elem), attrs) : false,
    warningMessage: '<html> element should have "lang" attribute.'
  });
}
