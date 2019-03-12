import { hasAttribute } from '../utils';
import Validator from '../validator';

export default function scopeOnlyInCell($: any, content: string): Validator {
  return new Validator({
    $template: $,
    content,
    selectors: ':not(th)',
    assocAttrs: ['scope'],
    isInvalid: ($elem: Cheerio, attrs?: string[]) => attrs ? hasAttribute($elem, attrs) : false,
    warningMessage: '"scope" attribute can only be applied to <th> element'
  });
}
