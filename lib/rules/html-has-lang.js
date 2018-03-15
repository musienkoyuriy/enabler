const Validator = require('../validator');

function htmlHasLang($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: 'html',
    isInvalid: selector => !selector.attr('lang'),
    warningMessage: '<html> tag should have "lang" attribute.',
  });
}

module.exports = htmlHasLang;
