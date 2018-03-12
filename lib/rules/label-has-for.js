const Validator = require('../validator');

function labelHasFor($, content, options) {
  return new Validator({
    $template: $,
    content,
    selectors: 'label',
    isInvalid: selector => selector.attr('for'),
    warningMessage: '"for" attribute is missing in "label"',
  });
}

module.exports = labelHasFor;
