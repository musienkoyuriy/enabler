import DOMNodesValidator from '../../dom-nodes-validator';
import { getAttrValue } from '../../utils';

export default function noPositiveTabindex($: any, content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selector: '*',
    assocAttrs: ['tabindex'],
    isInvalid: (elem: CheerioElement, attrs?: string[]) => {
      const tabIndex = attrs ? getAttrValue($(elem), attrs) : '';

      return Number(tabIndex) > 0;
    },
    warningMessage: 'Avoid positive tabindex.'
  });
}
