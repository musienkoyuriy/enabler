'use strict';

const Validator = require('../validator');

function placeholderWithoutLabel($, content) {
  return new Validator({
    $template: $,
    content: content,
    selectors: ['input[type=text]', 'textarea'],
    isInvalid: function(selector) {
      const inputsId = selector.attr('id');
      const placeholder = selector.attr('placeholder');
      const relatedLabel = $(`label[for="${inputsId}"]`);

      return !relatedLabel.length && placeholder;
    },
    warningMessage: 'Placeholders in inputs and textareas should be used in addition to a label, not as a replacement.'
  });
}

module.exports = placeholderWithoutLabel;
