const Validator = require('../validator');

function htmlLangAttribute($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: 'html',
    isInvalid: selector => !selector.attr('lang'),
    warningMessage: '<html> tag should have "lang" atribute.',
  });
}

module.exports = htmlLangAttribute;
