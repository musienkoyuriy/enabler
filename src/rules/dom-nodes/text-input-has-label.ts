import { getAttrValue } from '../../utils';
import DOMNodesValidator from '../../validator';

export default function textInputHasLabel($: any, content: string): DOMNodesValidator {
  return new DOMNodesValidator({
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
