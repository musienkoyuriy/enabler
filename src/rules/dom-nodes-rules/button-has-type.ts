import DOMNodesValidator from '../../dom-nodes-validator';
import { hasNonEmptyAttribute } from '../../utils';

export default function buttonHasType($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: 'button',
    assocAttrs: ['type'],
    isInvalid: (elem: CheerioElement, attrs?: string[]) => {
      const buttonTypes = ['button', 'reset', 'submit'];
      if (attrs) {
        return !hasNonEmptyAttribute($(elem), attrs) || !buttonTypes.includes($(elem).attr('type'));
      }
      return false;
    },
    warningMessage: '<button> element should have "type" to prevent unexpected behavior. For example if you need button just as an interface element use <button type="button"> instead'
  });
}