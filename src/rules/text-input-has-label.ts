import { getAttrValue } from '../utils';
import Validator from '../validator';

export default function textInputHasLabel($: any, content: string): Validator {
  return new Validator({
    $template: $,
    content,
    selectors: 'input[type="text"]',
    assocAttrs: ['id'],
    isInvalid: ($elem: Cheerio, attrs?: string[]) => {
      const inputId = attrs ? getAttrValue($elem, attrs) : '';

      if (!inputId) {
        return false;
      }

      const associatedLabel = $(`label[for="${inputId}"]`);

      return !associatedLabel.length;
    },
    warningMessage: 'Inputs with "text" type should have a label.'
  });
}
