import DOMNodesValidator from '../../dom-nodes-validator';
import { RuleData } from './../../models/rule';
import { getAttrValue } from '../../utils';

export default function textInputHasLabel($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: 'input[type="text"]',
    assocAttrs: ['id'],
    isInvalid: (rule: RuleData) => {
      const { elem, attrs } = rule;
      const inputId = attrs ? getAttrValue($(elem), attrs) : '';

      if (!inputId) {
        return false;
      }

      const associatedLabel = $(`label[for="${inputId}"]`);

      return !associatedLabel.length;
    },
    warningMessage: 'Inputs with "text" type should have a label.'
  });
}
