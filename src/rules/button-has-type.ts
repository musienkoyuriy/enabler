import { hasAttribute } from '../utils';
import Validator from '../validator';

export default function buttonHasType($: any, content: string): Validator {
  return new Validator({
    $template: $,
    content,
    selectors: 'button',
    assocAttrs: ['type'],
    isInvalid: ($elem: Cheerio, attrs?: string[]) => {
      const buttonTypes = ['button', 'reset', 'submit'];
      if (attrs) {
        return !hasAttribute($elem, attrs) || !buttonTypes.includes($elem.attr('type'));
      }
      return false;
    },
    warningMessage: '<button> element should have "type" to prevent unexpected behavior. If you need button just as an interface element use <button type="button"> instead'
  });
}
