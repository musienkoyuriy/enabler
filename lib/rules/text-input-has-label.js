const Validator = require('../validator');
const { getAttrValue } = require('../utils');

function textInputHasLabel($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: 'input[type="text"]',
    assocAttrs: ['id'],
    isInvalid: ($elem, attrs) => {
      const inputId = getAttrValue($elem, attrs);

      if (!inputId) {
        return false;
      }

      const associatedLabel = $(`label[for="${inputId}"]`);


      return !associatedLabel.length;
    },
    warningMessage: 'Inputs with "text" type should have a label.',
  });
}

module.exports = textInputHasLabel;
