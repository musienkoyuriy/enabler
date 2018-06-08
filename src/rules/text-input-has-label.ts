import Validator from '../validator';
import { getAttrValue } from '../utils';

export default function textInputHasLabel($: any,content: string) {
  return new Validator({
    $template: $,
    content,
    selectors: 'input[type="text"]',
    assocAttrs: ['id'],
    isInvalid: ($elem: any, attrs: string[]) => {
      const inputId = getAttrValue($elem, attrs);

      if (!inputId) {
        return false;
      }

      const associatedLabel = $(`label[for="${inputId}"]`);

      return !associatedLabel.length;
    },
    warningMessage: 'Inputs with "text" type should have a label.'
  });
}
