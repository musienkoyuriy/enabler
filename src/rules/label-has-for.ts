import { hasNonEmptyAttribute } from '../utils';
import Validator from '../validator';

export default function labelHasFor($: any, content: string): Validator {
  return new Validator({
    $template: $,
    content,
    selectors: 'label',
    assocAttrs: ['for'],
    isInvalid: ($elem: Cheerio, attrs?: string[]) => attrs ? !hasNonEmptyAttribute($elem, attrs) : false,
    warningMessage: '"for" attribute is missing in "label".'
  });
}
