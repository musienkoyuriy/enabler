const Validator = require('../validator');
const { hasAttribute } = require('../utils');

function labelHasFor($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: 'label',
    assocAttrs: ['for'],
    isInvalid: ($elem, attrs) => !hasAttribute($elem, attrs),
    warningMessage: '"for" attribute is missing in "label"',
  });
}

module.exports = labelHasFor;
