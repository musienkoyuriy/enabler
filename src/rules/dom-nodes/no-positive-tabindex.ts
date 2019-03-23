import { getAttrValue } from '../../utils';
import DOMNodesValidator from '../../validator';

export default function noPositiveTabindex($: any, content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selectors: '*',
    assocAttrs: ['tabindex'],
    isInvalid: ($elem: Cheerio, attrs?: string[]) => {
      const tabIndex = attrs ? getAttrValue($elem, attrs) : '';

      return Number(tabIndex) > 0;
    },
    warningMessage: 'Avoid positive tabindex.'
  });
}
