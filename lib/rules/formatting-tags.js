'use strict';

const Validator = require('../validator');

function formattingTagsValidate($, content) {
  return new Validator({
    $template: $,
    content: content,
    selectors: [
      'align', 'alink', 'background', 
      'basefont', 'bgcolor', 'border',
      'color', 'link', 'text',
      'vlink', 'height', 'basefont',
      'blink', 'center', 'font', 
      'marquee', 's', 'strike',
      'tt', 'u'
    ],
    isInvalid: function(selector) {
      return selector;
    },
    warningMessage: function(el) {
      const tagName = el[0].name;
      
      return `HTML tags and attributes designed exclusively for formatting should not be used. Use CSS rules instead of <${tagName}> tag.`
    }
  });
}

module.exports = formattingTagsValidate;
