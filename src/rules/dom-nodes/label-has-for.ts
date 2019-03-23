import { hasNonEmptyAttribute } from '../../utils';
import DOMNodesValidator from '../../validator';

export default function labelHasFor($: any, content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selectors: 'label',
    assocAttrs: ['for'],
    isInvalid: ($elem: Cheerio, attrs?: string[]) => attrs ? !hasNonEmptyAttribute($elem, attrs) : false,
    warningMessage: '"for" attribute is missing in "label".'
  });
}
