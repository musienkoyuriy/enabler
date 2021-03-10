import { formattingTags } from '../../constants';
import DOMNodesValidator from '../../dom-nodes-validator';
import { RuleData } from './../../models/rule';

export default function noFormattingTags($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: formattingTags,
    isInvalid: (rule: RuleData) => $(rule.elem).length > 0,
    warningMessage: (el: any) => {
      const tagName = el.name;

      return `HTML tags and attributes designed exclusively for formatting should not be used. Use CSS rules instead of <${tagName}> tag.`;
    }
  });
}
