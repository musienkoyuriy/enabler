import DOMNodesValidator from '../../dom-nodes-validator';
import { hasNonEmptyAttribute } from '../../utils';
import { RuleData } from './../../models/rule';

export default function noMediaAutoplay($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: 'audio, video',
    assocAttrs: ['autoplay'],
    isInvalid: (rule: RuleData) => {
      const { elem, attrs } = rule;
      return attrs ? hasNonEmptyAttribute($(elem), attrs) : false;
    },
    warningMessage: (elem: any) => {
      const tagName = elem.tagName;

      return `<${tagName}> should not play automatically. Some of your users will have problems focusing and unexpected sounds can distract them further.`;
    }
  });
}
