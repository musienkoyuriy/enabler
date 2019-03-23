import { hasNonEmptyAttribute } from '../../utils';
import DOMNodesValidator from '../../validator';

export default function scopeOnlyInCell($: any, content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selectors: ':not(th)',
    assocAttrs: ['scope'],
    isInvalid: ($elem: Cheerio, attrs?: string[]) => attrs ? hasNonEmptyAttribute($elem, attrs) : false,
    warningMessage: '"scope" attribute can only be applied to <th> element'
  });
}
