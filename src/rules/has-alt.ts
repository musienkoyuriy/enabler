import Validator from '../validator';
import { hasAttribute } from '../utils';

export default function hasAlt($: any, content: string) {
  return new Validator({
    $template: $,
    content,
    selectors: ['img', 'area'],
    assocAttrs: ['alt'],
    isInvalid: ($elem: any, attrs: string[]) => !hasAttribute($elem, attrs),
    warningMessage: (el: any) => {
      const tagName = el[0].name;
      const purpose = tagName === 'img' ? 'image map' : 'link';
      const message = `The alt attribute of the <${tagName} /> tag must state the purpose of the ${purpose}.`;

      return message;
    }
  });
}
