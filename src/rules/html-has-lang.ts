import { hasAttribute } from '../utils';
import Validator from '../validator';

export default function htmlHasLang($: any, content: string): Validator {
  return new Validator({
    $template: $,
    content,
    selectors: 'html',
    assocAttrs: ['lang'],
    isInvalid: ($elem: Cheerio, attrs?: string[]) => attrs ? !hasAttribute($elem, attrs) : false,
    warningMessage: '<html> element should have "lang" attribute.'
  });
}
