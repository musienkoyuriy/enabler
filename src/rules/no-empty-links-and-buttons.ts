import { getAttrValue } from '../utils';
import Validator from '../validator';

export default function emptyLinksAndButtons($: any, content: string) {
  return new Validator({
    $template: $,
    content,
    selectors: ['input[type="submit"]', 'button', 'a'],
    assocAttrs: ['value'],
    isInvalid: ($elem: any, attrs: string[]) => {
      const tagName = $elem[0].name;

      console.log();

      return [
        tagName === 'input' && !getAttrValue($elem, attrs),
        tagName === 'button' && !$elem.text(),
        tagName === 'a' && !$elem.html()
      ].some(Boolean);
    },
    warningMessage: (el: any) => {
      const tagName = el.name;
      const message = tagName === 'input' ?
        '"Value" attribute should not be empty in "input" tag' :
        `Text should contains in "${tagName}" tag.`;

      return message;
    }
  });
}
