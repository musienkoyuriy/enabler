import DOMNodesValidator from '../../dom-nodes-validator';
import { hasNonEmptyAttribute } from '../../utils';

export default function hasAlt($: any, content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selectors: ['img', 'area'],
    assocAttrs: ['alt'],
    isInvalid: (elem: CheerioElement, attrs?: string[]) => {
      return attrs ? !hasNonEmptyAttribute($(elem), attrs) : false;
    },
    warningMessage: (el: any) => {
      const tagName = el.name;
      const purpose = tagName === 'img' ? 'image map' : 'link';
      const message = `The alt attribute of the <${tagName} /> element must state the purpose of the ${purpose}.`;

      return message;
    }
  });
}
