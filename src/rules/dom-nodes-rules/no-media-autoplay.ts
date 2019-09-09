import DOMNodesValidator from '../../dom-nodes-validator';
import { hasNonEmptyAttribute } from '../../utils';

export default function noMediaAutoplay($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: 'audio, video',
    assocAttrs: ['autoplay'],
    isInvalid: (elem: CheerioElement, attrs?: string[]) => attrs ? hasNonEmptyAttribute($(elem), attrs) : false,
    warningMessage: (elem: any) => {
      const tagName = elem.tagName;

      return `<${tagName}> should not play automatically. Some of your users will have problems focusing and unexpected sounds can distract them further.`;
    }
  });
}
