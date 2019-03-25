import DOMNodesValidator from '../../dom-nodes-validator';
import { getAttrValue } from '../../utils';

export default function placeholderHasLabel($: any, content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selector: ['input[type=text]', 'textarea'],
    assocAttrs: ['id', 'placeholder'],
    isInvalid: (elem: CheerioElement, attrs?: string[]) => {
      const placeholderAttrs = attrs ? attrs.filter(attr => /placeholder/gi.test(attr)) : [];
      const idAttrs = attrs ? attrs.filter(attr => /id/gi.test(attr)) : [];

      const inputsId = getAttrValue($(elem), idAttrs);
      const placeholder = getAttrValue($(elem), placeholderAttrs);
      const relatedLabel = $(`label[for="${inputsId}"]`);

      return !relatedLabel.length && Boolean(placeholder);
    },
    warningMessage: 'Placeholders in inputs and textareas should be used in addition to a label, not as a replacement.'
  });
}
