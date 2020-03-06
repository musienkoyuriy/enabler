import DOMNodesValidator from '../../dom-nodes-validator';
import { hasNonEmptyAttribute } from '../../utils';
import { RuleData } from './../../models/rule';

export default function buttonHasType($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: 'button',
    assocAttrs: ['type'],
    isInvalid: (rule: RuleData) => {
      const { elem, attrs } = rule;
      const buttonTypes = ['button', 'reset', 'submit'];
      if (attrs) {
        return (
          !hasNonEmptyAttribute($(elem), attrs) ||
          !buttonTypes.includes($(elem).attr('type'))
        );
      }
      return false;
    },
    warningMessage:
      '<button> element should have "type" to prevent unexpected behavior. For example if you need button just as an interface element use <button type="button"> instead'
  });
}
