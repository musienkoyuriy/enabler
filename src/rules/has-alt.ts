import { hasAttribute } from '../utils';
import Validator from '../validator';

export default function hasAlt($: any, content: string) {
  return new Validator({
    $template: $,
    content,
    selectors: ['img', 'area'],
    assocAttrs: ['alt'],
    isInvalid: ($elem: any, attrs: string[]) => {
      return !hasAttribute($elem, attrs);
    },
    warningMessage: (el: any) => {
      const tagName = el.name;
      const purpose = tagName === 'img' ? 'image map' : 'link';
      const message = `The alt attribute of the <${tagName} /> tag must state the purpose of the ${purpose}.`;

      return message;
    }
  });
}
