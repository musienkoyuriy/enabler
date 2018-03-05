'use strict';

const Validator = require('../validator');

function htmlLangAttribute($, content) {
  return new Validator({
    $template: $,
    content: content,
    selectors: 'html',
    isInvalid: function(selector) {
      return !selector.attr('lang');
    },
    warningMessage: '<html> tag should have "lang" atribute.'
  });
}

module.exports = htmlLangAttribute;
