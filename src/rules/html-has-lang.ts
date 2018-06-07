import Validator from '../validator';
import { hasAttribute } from '../utils';

export default function htmlHasLang($: any,content: string) {
  return new Validator({
    $template: $,
    content,
    selectors: 'html',
    assocAttrs: ['lang'],
    isInvalid: ($elem: any, attrs: string[]) => {
      return !hasAttribute($elem, attrs);
    },
    warningMessage: '<html> tag should have "lang" attribute.'
  });
}
