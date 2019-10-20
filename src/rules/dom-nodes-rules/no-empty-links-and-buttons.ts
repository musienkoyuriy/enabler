import { RuleData } from './../../models/rule';
import DOMNodesValidator from '../../dom-nodes-validator';
import { getAttrValue } from '../../utils';

export default function emptyLinksAndButtons($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: ['input[type="submit"]', 'button', 'a'],
    assocAttrs: ['value'],
    isInvalid: (rule: RuleData) => {
      const { elem, attrs } = rule
      const tagName = $(elem)[0].name;

      return [
        tagName === 'input' && (attrs ? !getAttrValue($(elem), attrs) : ''),
        tagName === 'button' && !$(elem).text(),
        tagName === 'a' && !$(elem).html()
      ].some(Boolean);
    },
    warningMessage: (el: any) => {
      const tagName = el.name;
      const message = tagName === 'input' ?
        '"Value" attribute should not be empty in "input" tag' :
        `Text should contains in "${tagName}" tag.`;

      return message;
    }
  });
}
