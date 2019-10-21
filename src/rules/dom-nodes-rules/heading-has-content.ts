import DOMNodesValidator from '../../dom-nodes-validator';
import { RuleData } from './../../models/rule';

export default function headingHasContent($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: [':header'],
    isInvalid: (rule: RuleData) => {
      const { elem } = rule;
      return !$(elem).text();
    },
    warningMessage: 'Heading tags should contains a text.'
  });
}
