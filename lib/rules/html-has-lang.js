const Validator = require('../validator');

function htmlHasLang($, content, options) {
  return new Validator({
    $template: $,
    content,
    selectors: 'html',
    isInvalid: selector => !selector.attr('lang'),
    warningMessage: '<html> tag should have "lang" atribute.',
  });
}

module.exports = htmlHasLang;
