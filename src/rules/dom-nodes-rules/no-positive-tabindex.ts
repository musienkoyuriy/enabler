import DOMNodesValidator from '../../dom-nodes-validator';
import { getAttrValue } from '../../utils';
import { RuleData } from './../../models/rule';

export default function noPositiveTabindex($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: '*',
    assocAttrs: ['tabindex'],
    isInvalid: (rule: RuleData) => {
      const { elem, attrs } = rule;
      const tabIndex = attrs ? getAttrValue($(elem), attrs) : '';

      return Number(tabIndex) > 0;
    },
    warningMessage: 'Avoid positive tabindex.'
  });
}
