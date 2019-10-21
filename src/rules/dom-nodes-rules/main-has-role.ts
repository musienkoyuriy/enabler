import DOMNodesValidator from '../../dom-nodes-validator';
import { getAttrValue } from '../../utils';
import { RuleData } from './../../models/rule';

export default function mainHasRole($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: 'main',
    assocAttrs: ['role'],
    isInvalid: (rule: RuleData) => {
      const { elem, attrs } = rule;
      const roleValue = attrs ? getAttrValue($(elem), attrs) : '';
      return roleValue !== 'main';
    },
    warningMessage: '<main> element should have an appropriate "role" attribute (role="main")'
  });
}
