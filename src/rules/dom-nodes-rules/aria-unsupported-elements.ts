import { ariaAttributes } from '../../constants';
import DOMNodesValidator from '../../dom-nodes-validator';
import { RuleData } from './../../models/rule';

export default function ariaUnsupportedElements($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: ['meta', 'html', 'script', 'style'],
    assocAttrs: ariaAttributes,
    isInvalid: (rule: RuleData) => {
      const { attrs } = rule;
      const attributes = $(rule.elem).attr();

      return attrs ? attrs.some(attr => attr in attributes) : false;
    },
    warningMessage: "Hidden elements shouldn't contains aria- attributes."
  });
}
