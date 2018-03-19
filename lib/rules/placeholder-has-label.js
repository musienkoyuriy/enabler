const Validator = require('../validator');

function placeholderHasLabel($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: ['input[type=text]', 'textarea'],
    isInvalid: ($elem) => {
      const inputsId = $elem.attr('id');
      const placeholder = $elem.attr('placeholder');
      const relatedLabel = $(`label[for="${inputsId}"]`);

      return !relatedLabel.length && placeholder;
    },
    warningMessage: 'Placeholders in inputs and textareas should be used in addition to a label, not as a replacement.',
  });
}

module.exports = placeholderHasLabel;
