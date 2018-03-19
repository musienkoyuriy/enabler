const Validator = require('../validator');
const { hasAttribute } = require('../utils');

function htmlHasLang($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: 'html',
    assocAttrs: ['lang'],
    isInvalid: ($elem, attrs) => {
      return !hasAttribute($elem, attrs);
    },
    warningMessage: '<html> tag should have "lang" attribute.',
  });
}

module.exports = htmlHasLang;
