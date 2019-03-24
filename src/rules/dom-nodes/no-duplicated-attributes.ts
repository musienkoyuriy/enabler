import { getDuplicateAttributes } from '../../utils';
import DOMNodesValidator from '../../validator';

export default function noDuplicatedAttributes($: any,content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selectors: '*',
    isInvalid: (elem: CheerioElement) => {
      const duplicatedAttrs = getDuplicateAttributes($(elem), content);

      return Boolean(duplicatedAttrs.length);
    },
    warningMessage: 'Element should not have duplicated attributes.'
  });
}
