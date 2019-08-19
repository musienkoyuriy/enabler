import DOMNodesValidator from '../../../dom-nodes-validator';
import { getDuplicateAttributes } from '../../../utils';

export default function noDuplicatedAttributes($: any,content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selector: '*',
    isInvalid: (elem: CheerioElement) => {
      const duplicatedAttrs = getDuplicateAttributes($(elem), content);

      return Boolean(duplicatedAttrs.length);
    },
    warningMessage: 'Element should not have duplicated attributes.'
  });
}