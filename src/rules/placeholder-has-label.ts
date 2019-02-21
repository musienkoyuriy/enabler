import { getAttrValue } from '../utils';
import Validator from '../validator';

export default function placeholderHasLabel($: any, content: string): Validator {
  return new Validator({
    $template: $,
    content,
    selectors: ['input[type=text]', 'textarea'],
    assocAttrs: ['id', 'placeholder'],
    isInvalid: ($elem: Cheerio, attrs?: string[]) => {
      const placeholderAttrs = attrs ? attrs.filter(attr => /placeholder/gi.test(attr)) : [];
      const idAttrs = attrs ? attrs.filter(attr => /id/gi.test(attr)) : [];

      const inputsId = getAttrValue($elem, idAttrs);
      const placeholder = getAttrValue($elem, placeholderAttrs);
      const relatedLabel = $(`label[for="${inputsId}"]`);

      return !relatedLabel.length && Boolean(placeholder);
    },
    warningMessage: 'Placeholders in inputs and textareas should be used in addition to a label, not as a replacement.'
  });
}
