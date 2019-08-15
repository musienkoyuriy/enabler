import { formattingTags } from '../../../constants';
import DOMNodesValidator from '../../../dom-nodes-validator';

export default function noFormattingTags($: any, content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selector: formattingTags,
    isInvalid: (elem: CheerioElement) => $(elem).length > 0,
    warningMessage: (el: any) => {
      const tagName = el.name;

      return `HTML tags and attributes designed exclusively for formatting should not be used. Use CSS rules instead of <${tagName}> tag.`;
    }
  });
}
