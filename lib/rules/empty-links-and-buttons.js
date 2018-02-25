'use strict';

var Validator = require('../validator');

function emptyLinksAndButtonsValidate($, content) {
  return new Validator({
    $template: $,
    content: content,
    selectors: ['input[type="submit"]', 'button', 'a'],
    isInvalid: function(selector) {
      const tagName = selector[0].name;

      return [
        tagName === 'input' && !selector.attr('value'),
        tagName === 'button' && !selector.text(),
        tagName === 'a' && !selector.text()
      ].some(Boolean);
    },
    warningMessage: function(el) {
      const tagName = el[0].name;
      const message = tagName === 'input' ? 
        '"Value" attribute should not be empty in "input" tag' :
        `Text should contains in "${tagName}" tag.`

      return message;
    }
  });
}

module.exports = emptyLinksAndButtonsValidate;