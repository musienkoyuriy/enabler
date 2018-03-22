const Validator = require('../validator');
const { getAttrValue } = require('../utils');

function placeholderHasLabel($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: ['input[type=text]', 'textarea'],
    assocAttrs: ['id', 'placeholder'],
    isInvalid: ($elem, attrs) => {
      const placeholderAttrs = attrs.filter(attr => /placeholder/gi.test(attr));
      const idAttrs = attrs.filter(attr => /id/gi.test(attr));

      const inputsId = getAttrValue($elem, idAttrs);
      const placeholder = getAttrValue($elem, placeholderAttrs);
      const relatedLabel = $(`label[for="${inputsId}"]`);

      return !relatedLabel.length && placeholder;
    },
    warningMessage: 'Placeholders in inputs and textareas should be used in addition to a label, not as a replacement.',
  });
}

module.exports = placeholderHasLabel;
