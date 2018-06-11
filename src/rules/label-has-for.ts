import { hasAttribute } from '../utils';
import Validator from '../validator';

export default function labelHasFor($: any, content: string) {
  return new Validator({
    $template: $,
    content,
    selectors: 'label',
    assocAttrs: ['for'],
    isInvalid: ($elem: any, attrs: string[]) => !hasAttribute($elem, attrs),
    warningMessage: '"for" attribute is missing in "label".'
  });
}
